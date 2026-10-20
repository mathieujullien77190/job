// usage (depuis boulot/) : node outils/firebase/build-rules.mjs [--deploy]
// Génère outils/firebase/.generated/firestore.rules depuis le modèle et outils/.secrets/vault.txt
// (créé avec un secret aléatoire s'il n'existe pas). --deploy publie ensuite les règles sur le projet Firebase.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomBytes } from 'node:crypto'
import { execSync } from 'node:child_process'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..')
const secretFile = join(root, 'outils', '.secrets', 'vault.txt')

if (!existsSync(secretFile)) {
  mkdirSync(dirname(secretFile), { recursive: true })
  writeFileSync(secretFile, randomBytes(24).toString('base64url') + '\n')
  console.log(`Secret créé : ${secretFile}`)
}
const secret = readFileSync(secretFile, 'utf8').trim()
if (!/^[A-Za-z0-9_-]{24,}$/.test(secret)) throw new Error('Secret invalide : 24 caractères minimum, [A-Za-z0-9_-] seulement.')

const template = readFileSync(join(root, 'outils', 'firebase', 'firestore.rules.template'), 'utf8')
const out = join(root, 'outils', 'firebase', '.generated', 'firestore.rules')
mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, template.replaceAll('__VAULT_SECRET__', secret))
console.log(`Règles écrites : ${out}`)

if (process.argv.includes('--deploy')) {
  execSync('npx -y firebase-tools deploy --only firestore:rules', { cwd: root, stdio: 'inherit' })
}
