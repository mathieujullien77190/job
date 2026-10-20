// Base de connaissance : les fiches de library.mjs vivent en HTML dans Firestore (kb/<id>) ; plus de PDF stocké.
//
//   node outils/fiches/build.mjs --check [id1,id2,...]
//       mesure la longueur de chaque fiche (PDF temporaire via Chrome, supprimé) : « TROP LONG » au-delà de 3 pages de contenu.
//   node outils/fiches/build.mjs --export
//       écrit outils/fiches/.generated/kb.json (fiches en HTML + texte de recherche + texte à lire à voix haute).
//   node outils/fiches/build.mjs --publish
//       --export puis envoie toutes les fiches dans Firestore (kb/<id>) : la page les affiche tout de suite.
//   node outils/fiches/build.mjs --keywords <slug> id1,id2,...
//       écrit dans Firestore (applications/<slug>.keywords) les mots-clés de l'offre, qui pointent vers les fiches par leur id.
import { pathToFileURL, fileURLToPath } from 'node:url'
import { mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { library } from './library.mjs'
import { mergeDocument, setDocument } from '../firebase/db.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..')
const args = process.argv.slice(2)
const mode = args[0]
if (!['--check', '--export', '--publish', '--keywords'].includes(mode)) {
  console.error('usage: node outils/fiches/build.mjs --check [ids] | --export | --publish | --keywords <slug> id1,id2,...')
  process.exit(1)
}

const byId = new Map(library.map((d) => [d.id, d]))
const pick = (idsArg) =>
  idsArg.split(',').map((id) => {
    const d = byId.get(id.trim())
    if (!d) {
      console.error(`fiche inconnue : ${id} (ajoute-la dans docs-extra.mjs). Ids dispo : ${[...byId.keys()].join(', ')}`)
      process.exit(1)
    }
    return d
  })

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const LEVELS = { acquis: 'Acquis (dans ton CV)', partiel: 'Partiel', 'à préparer': 'À préparer' }

const css = `
@page { size: A4; margin: 14mm 15mm; }
* { box-sizing: border-box; }
body { font: 10pt/1.42 "Segoe UI", Arial, sans-serif; color: #1c2330; margin: 0; }
header { border-bottom: 2px solid #1f4e8c; padding-bottom: 6px; margin-bottom: 10px; }
.cat { color: #667085; font-size: 8.5pt; text-transform: uppercase; letter-spacing: .06em; }
h1 { font-size: 19pt; margin: 2px 0 4px; color: #1f4e8c; }
.lead { font-size: 10.5pt; margin: 0; }
h2 { font-size: 11.5pt; margin: 11px 0 3px; color: #1f4e8c; }
p { margin: 3px 0; }
ul { margin: 3px 0; padding-left: 18px; }
li { margin: 1px 0; }
code { font-family: Consolas, monospace; font-size: 9pt; background: #eef1f6; padding: 0 3px; border-radius: 3px; }
pre { font: 8.6pt/1.35 Consolas, monospace; background: #eef1f6; border-radius: 5px; padding: 7px 9px; margin: 5px 0; white-space: pre-wrap; break-inside: avoid; }
pre code { background: none; padding: 0; font-size: inherit; }
table { border-collapse: collapse; width: 100%; margin: 4px 0; font-size: 9.2pt; }
th, td { border: 1px solid #d5dae3; padding: 3px 6px; text-align: left; vertical-align: top; }
th { background: #eef1f6; }
.cv { margin-top: 10px; padding: 7px 10px; border-left: 4px solid #1f4e8c; background: #f3f6fb; break-inside: avoid; }
.cv b.lvl { color: #1f4e8c; }
footer { margin-top: 8px; color: #8a93a5; font-size: 8pt; }
dl.faq { margin: 3px 0; }
dl.faq dt { font-weight: 600; margin-top: 5px; color: #1c2330; }
dl.faq dd { margin: 1px 0 0 0; }
`

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// bloc de code : <pre> avec le contenu échappé (écrit entre balises [[code ... ]] dans les sources)
const withCode = (html) => html.replace(/\[\[code\n([\s\S]*?)\n\]\]/g, (_, c) => `<pre><code>${esc(c)}</code></pre>`)
// texte brut d'une fiche, pour la recherche plein texte de la page
const plain = (d) =>
  `${d.summary} ${d.body}`
    .replace(/\[\[code\n([\s\S]*?)\n\]\]/g, ' $1 ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()

// Texte à lire à voix haute : titres (« ## »), paragraphes et listes ; sans tableaux ni code.
const speechOf = (d) => {
  const body = d.body
    .replace(/\[\[code\n[\s\S]*?\n\]\]/g, ' ')
    .replace(/<pre>[\s\S]*?<\/pre>/g, ' ')
    .replace(/<table>[\s\S]*?<\/table>/g, ' ')
    .replace(/<h2>([\s\S]*?)<\/h2>/g, '\n\n## $1\n')
    .replace(/<dt>/g, '\n')
    .replace(/<\/dd>/g, '\n')
    .replace(/<li>/g, '\n- ')
    .replace(/<\/p>/g, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
  const summary = d.summary.replace(/<[^>]+>/g, '')
  return `# ${d.label}\n${summary}\n${body}`
    .split('\n')
    .map((l) => l.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

const MAX_PAGES = 3 // limite sur le contenu de la fiche (cible : 2 pages ou plus s’il y a de quoi dire), questions/réponses non comptées

const page = (d, body) => `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${esc(d.label)}</title><style>${css}</style></head><body>
<header><div class="cat">Base de connaissance · ${esc(d.category)}</div><h1>${esc(d.label)}</h1><p class="lead">${d.summary}</p></header>
${withCode(body)}
<div class="cv"><b class="lvl">Ton niveau : ${LEVELS[d.level]}.</b> ${d.cv}</div>
<footer>Fiche de préparation — base de connaissance</footer>
</body></html>`

// Nombre de pages d'une fiche une fois imprimée (PDF temporaire, supprimé aussitôt).
const countPages = (html) => {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
  const tmpHtml = join(tmpdir(), `doc-${id}.html`)
  const tmpPdf = join(tmpdir(), `doc-${id}.pdf`)
  writeFileSync(tmpHtml, html, 'utf8')
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${tmpPdf}`, pathToFileURL(tmpHtml).href], { stdio: 'ignore' })
  const pages = (readFileSync(tmpPdf, 'latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length
  rmSync(tmpHtml)
  rmSync(tmpPdf)
  return pages
}

// Le bloc « Questions fréquentes » (ou « Questions à poser ») est la dernière section de la fiche.
const withoutFaq = (body) => body.replace(/<h2>Questions[^<]*<\/h2>[\s\S]*$/, '')

const check = (d) => {
  const pages = countPages(page(d, d.body))
  // La limite s'applique au contenu sans les questions/réponses : on ne mesure cette version que si le total dépasse.
  const contentPages = pages > MAX_PAGES ? countPages(page(d, withoutFaq(d.body))) : pages
  console.log(`${contentPages > MAX_PAGES ? 'TROP LONG' : 'ok'}  ${pages}p (${contentPages}p sans Q/R)  ${d.id}`)
}

const entry = (d) => ({
  id: d.id,
  label: d.label,
  category: d.category,
  level: d.level,
  terms: d.terms,
  summary: d.summaryShort ?? d.summary.replace(/<[^>]+>/g, ''),
})

// Fiche telle qu'elle est stockée dans Firestore (kb/<id>) : HTML de la page + textes de recherche et de lecture.
const toKb = (d, order) => ({ ...entry(d), order, text: plain(d), speech: speechOf(d), html: page(d, d.body) })

if (mode === '--check') {
  const ids = args[1] ? pick(args[1]) : library
  for (const d of ids) check(d)
} else if (mode === '--export' || mode === '--publish') {
  const kb = library.map(toKb)
  const generated = join(root, 'outils', 'fiches', '.generated')
  mkdirSync(generated, { recursive: true })
  writeFileSync(join(generated, 'kb.json'), JSON.stringify(kb), 'utf8')
  console.log(`outils/fiches/.generated/kb.json : ${kb.length} fiches`)
  if (mode === '--publish') {
    for (const fiche of kb) await setDocument(`kb/${fiche.id}`, fiche)
    console.log(`Firestore : ${kb.length} fiches publiées (kb/<id>)`)
  }
} else {
  const [slug, ids] = [args[1], args[2]]
  if (!slug || !ids) {
    console.error('usage: node outils/fiches/build.mjs --keywords <slug> id1,id2,...')
    process.exit(1)
  }
  const docs = pick(ids)
  await mergeDocument(`applications/${slug}`, { keywords: docs.map(entry) })
  console.log(`Firestore : applications/${slug}.keywords = ${docs.length} mots-clés`)
}
process.exit(0)
