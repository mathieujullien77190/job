// usage (depuis boulot/) : node outils/cv/build.mjs <slug>
// Le CV vit en HTML dans Firestore : cv/<slug> = { annotated, clean }, cv/base = { html }.
// Copie de travail locale (hors git) : outils/cv/<slug>.html = CV annoté. Elle est créée depuis Firestore (cv/<slug>.annotated),
// sinon depuis le CV de base (cv/base.html) ; on la modifie, puis on relance ce script.
// Conventions du CV annoté :
//   <del>ancien texte</del> <mark>nouveau texte</mark>  remplacement
//   <mark>texte</mark>                                   ajout
//   <li><mark>…</mark></li>                              ligne ajoutée entière
//   <ins>texte</ins>                                     PROPOSITION (vert) : montrée dans l'aperçu, pas appliquée au CV à envoyer.
//                                                        Une fois validée, remplacer <ins> par <mark>.
//   <span class="note">(note)</span>                     annotation visible seulement dans l'aperçu
// Le script :
//   1. écrit annotated + clean dans Firestore (la page affiche l'aperçu et le CV à envoyer) ;
//   2. génère apercus_cv/<slug>.pdf (aperçu annoté, jamais envoyé) et envoi/<Entreprise>/CV_*.pdf (CV propre, nouveau texte seul).
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, rmSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { tmpdir } from 'node:os'
import { getDocument, mergeDocument } from '../firebase/db.mjs'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..')
const slug = process.argv[2]
if (!slug) {
  console.error('usage: node outils/cv/build.mjs <slug>')
  process.exit(1)
}

const application = await getDocument(`applications/${slug}`)
if (!application) {
  console.error(`Candidature introuvable dans Firestore : applications/${slug}`)
  process.exit(1)
}

// Copie de travail : celle du disque si elle existe, sinon Firestore, sinon le CV de base.
const source = join(root, 'outils', 'cv', `${slug}.html`)
if (!existsSync(source)) {
  const stored = (await getDocument(`cv/${slug}`))?.annotated
  const base = stored || (await getDocument('cv/base'))?.html
  if (!base) {
    console.error('Aucun CV de base dans Firestore (cv/base).')
    process.exit(1)
  }
  writeFileSync(source, base, 'utf8')
  console.log(`copie de travail créée : outils/cv/${slug}.html (${stored ? 'depuis Firestore' : 'depuis le CV de base'})`)
}

const annotated = readFileSync(source, 'utf8').replace(/^﻿/, '')

// CV propre : on garde le nouveau texte, on retire l'ancien et les annotations.
const clean = annotated
  // propositions en vert (<ins>) : visibles dans l'aperçu seulement, pas appliquées au CV à envoyer
  .replace(/<li><ins>[\s\S]*?<\/ins>(?:\s*<span class="note">[\s\S]*?<\/span>)?<\/li>\s*/g, '')
  .replace(/<ins>[\s\S]*?<\/ins>/g, '')
  .replace(/<del>[\s\S]*?<\/del>\s*(?:<br>\s*)?/g, '')
  .replace(/\s*<span class="note">[\s\S]*?<\/span>/g, '')
  .replace(/<\/?mark>/g, '')
  .replace(/<title>[^<]*<\/title>/, '<title>CV Mathieu JULLIEN</title>')

const leftovers = ['<del', '<mark', '<ins', 'class="note"'].filter((t) => clean.includes(t))
if (leftovers.length) throw new Error(`Annotations restantes dans le CV propre : ${leftovers.join(', ')}`)

await mergeDocument(`cv/${slug}`, { annotated, clean })
console.log(`Firestore : cv/${slug} mis à jour`)

const print = (html, pdf) => {
  const tmp = join(tmpdir(), `cv-${slug}-${Date.now()}.html`)
  writeFileSync(tmp, html, 'utf8')
  mkdirSync(dirname(pdf), { recursive: true })
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${pdf}`, pathToFileURL(tmp).href], {
    stdio: 'ignore',
  })
  rmSync(tmp)
  return (readFileSync(pdf, 'latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length
}

// Dossier d'envoi : envoi/<Entreprise>/ (nom de l'entreprise sans caractères interdits dans un nom de dossier)
const folderName = application.company.replace(/[<>:"/\\|?*]/g, '').trim()
const outDir = join(root, 'envoi', folderName)
// Nom du CV : réutilise le CV_*.pdf déjà présent, sinon CV_Mathieu_JULLIEN_<Slug>.pdf
const existing = (existsSync(outDir) ? readdirSync(outDir) : []).find((f) => /^CV_.*\.pdf$/i.test(f))
const cvName = existing ?? `CV_Mathieu_JULLIEN_${slug.charAt(0).toUpperCase()}${slug.slice(1)}.pdf`

const previewPages = print(annotated, join(root, 'apercus_cv', `${slug}.pdf`))
const cvPages = print(clean, join(outDir, cvName))

console.log(`aperçu annoté : apercus_cv/${slug}.pdf (${previewPages} p.)`)
console.log(`CV à envoyer  : envoi/${folderName}/${cvName} (${cvPages} p.)`)
process.exit(0)
