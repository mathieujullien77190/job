// usage (depuis boulot/) : node outils/cv/build-base.mjs
// Régénère cv_base/CV_base.pdf (CV de référence) depuis le HTML de Firestore (cv/base.html).
// Le PDF d'origine de l'utilisateur est conservé dans cv_base/CV_base_original.pdf (jamais écrasé).
import { readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { tmpdir } from 'node:os'
import { getDocument } from '../firebase/db.mjs'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..')
const target = join(root, 'cv_base', 'CV_base.pdf')

const html = (await getDocument('cv/base'))?.html
if (!html) throw new Error('Aucun CV de base dans Firestore (cv/base).')

// le CV de base ne doit contenir aucune annotation (<mark>, <del>, <ins>, note) : c'est le CV sans modification
const annotations = ['<mark', '<del', '<ins', 'class="note"'].filter((t) => html.includes(t))
if (annotations.length) throw new Error(`cv/base contient des annotations : ${annotations.join(', ')}`)

mkdirSync(dirname(target), { recursive: true })
const tmp = join(tmpdir(), `cv-base-${Date.now()}.html`)
writeFileSync(tmp, html, 'utf8')
execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${target}`, pathToFileURL(tmp).href], { stdio: 'ignore' })
rmSync(tmp)
const pages = (readFileSync(target, 'latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length
console.log(`cv_base/CV_base.pdf régénéré (${pages} p.)`)
process.exit(0)
