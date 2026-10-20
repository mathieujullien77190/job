// Accès à Firestore (vault/<secret>/…) depuis les scripts et depuis Claude Code, sans passer par la page.
//
// En ligne de commande (depuis boulot/) :
//   node outils/firebase/db.mjs list <collection>                 ids des documents
//   node outils/firebase/db.mjs get <collection>/<id> [champ]     document en JSON (ou la valeur d'un champ, texte brut si c'est une chaîne)
//   node outils/firebase/db.mjs set <collection>/<id> <fichier>   remplace le document par le JSON du fichier
//   node outils/firebase/db.mjs merge <collection>/<id> <fichier> fusionne le JSON du fichier dans le document
//   node outils/firebase/db.mjs put <collection>/<id> <champ> <fichier>  écrit le contenu texte du fichier dans un champ
//   node outils/firebase/db.mjs delete <collection>/<id>
//   node outils/firebase/db.mjs import-kb                         envoie outils/fiches/.generated/kb.json (node outils/fiches/build.mjs --export)
//
// En module : import { getDocument, setDocument, mergeDocument, listDocuments } from './db.mjs'
// Le secret est lu dans outils/.secrets/vault.txt (jamais dans git).
import { existsSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..')
// Le SDK Firebase est installé dans candidatures/ : on le charge depuis là.
const require = createRequire(join(root, 'candidatures', 'package.json'))
const { initializeApp } = require('firebase/app')
const { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } = require('firebase/firestore')

const strip = (s) => s.replace(/^﻿/, '')
const secret = strip(readFileSync(join(root, 'outils', '.secrets', 'vault.txt'), 'utf8')).trim()
const config = JSON.parse(strip(readFileSync(join(root, 'candidatures', 'src', 'helpers', 'firebase-config.json'), 'utf8')))
const db = getFirestore(initializeApp(config))

const ref = (path) => {
  const [name, id] = path.split('/')
  if (!name || !id) throw new Error(`Chemin invalide : ${path} (attendu <collection>/<id>)`)
  return doc(db, 'vault', secret, name, id)
}
const clean = (data) => JSON.parse(JSON.stringify(data)) // retire les undefined

export const listDocuments = async (name) => (await getDocs(collection(db, 'vault', secret, name))).docs.map((d) => d.id)
export const getDocument = async (path) => {
  const snap = await getDoc(ref(path))
  return snap.exists() ? snap.data() : undefined
}
export const setDocument = (path, data) => setDoc(ref(path), clean(data))
export const mergeDocument = (path, data) => setDoc(ref(path), clean(data), { merge: true })
export const deleteDocument = (path) => deleteDoc(ref(path))

const readJson = (file) => JSON.parse(strip(readFileSync(file, 'utf8')))

const main = async () => {
  const [command, path, a, b] = process.argv.slice(2)
  switch (command) {
    case 'list':
      console.log((await listDocuments(path)).join('\n'))
      break
    case 'get': {
      const data = await getDocument(path)
      if (data === undefined) throw new Error(`Introuvable : ${path}`)
      const value = a ? data[a] : data
      console.log(typeof value === 'string' ? value : JSON.stringify(value, null, 2))
      break
    }
    case 'set':
      await setDocument(path, readJson(a))
      console.log(`écrit : ${path}`)
      break
    case 'merge':
      await mergeDocument(path, readJson(a))
      console.log(`fusionné : ${path}`)
      break
    case 'put':
      await mergeDocument(path, { [a]: strip(readFileSync(b, 'utf8')) })
      console.log(`écrit : ${path}.${a}`)
      break
    case 'delete':
      await deleteDocument(path)
      console.log(`supprimé : ${path}`)
      break
    case 'import-kb': {
      const file = join(root, 'outils', 'fiches', '.generated', 'kb.json')
      if (!existsSync(file)) throw new Error('kb.json absent : lance node outils/fiches/build.mjs --export')
      const fiches = readJson(file)
      for (const fiche of fiches) await setDocument(`kb/${fiche.id}`, fiche)
      console.log(`${fiches.length} fiches envoyées`)
      break
    }
    default:
      console.error('commandes : list, get, set, merge, put, delete, import-kb (voir l\'en-tête du fichier)')
      process.exit(1)
  }
}

// Lancé directement (et non importé) : exécute la commande puis quitte (les connexions Firestore restent ouvertes sinon).
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().then(
    () => process.exit(0),
    (error) => {
      console.error(error.message)
      process.exit(1)
    },
  )
}
