// usage (depuis boulot/) : node outils/cv/send.mjs <slug>
// Génère la lettre en PDF dans envoi/<Entreprise>/ : uniquement ce qui part chez le recruteur.
//   CV_*.pdf                  déjà là (écrit par build.mjs), jamais dupliqué ailleurs
//   Lettre_motivation_*.pdf   la lettre mise en page (une page), générée à partir du texte de la lettre dans Firestore
//                             (applications/<slug>.message, modifiable depuis la page)
import { existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { tmpdir } from 'node:os'
import { getDocument } from '../firebase/db.mjs'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..')
const slug = process.argv[2]
if (!slug) {
  console.error('usage: node outils/cv/send.mjs <slug>')
  process.exit(1)
}

const strip = (s) => s.replace(/^\uFEFF/, '')
const info = await getDocument(`applications/${slug}`)
if (!info) {
  console.error(`Candidature introuvable dans Firestore : applications/${slug}`)
  process.exit(1)
}
const folderName = info.company.replace(/[<>:"/\\|?*]/g, '').trim()
const out = join(root, 'envoi', folderName)
const cvName = existsSync(out) ? readdirSync(out).find((f) => /^CV_.*\.pdf$/i.test(f)) : undefined
if (!cvName) {
  console.error(`Aucun CV_*.pdf dans ${out} : lance d'abord node outils/cv/build.mjs ${slug}.`)
  process.exit(1)
}

// La lettre : le texte de la candidature dans Firestore (avant un \u00E9ventuel lien d'annonce).
if (!info.message?.trim()) {
  console.error(`Pas de lettre dans applications/${slug}.message : \u00E9cris-la dans la page (onglet Lettre) ou avec db.mjs.`)
  process.exit(1)
}
const body = info.message.split(/\r?\n\r?\nhttps?:\/\//)[0].trim()
const blocks = body.split(/\r?\n\r?\n/).map((b) => b.trim()).filter(Boolean)

// Coordonnées de l'expéditeur : outils/.secrets/sender.json (hors git, le dépôt est public)
const sender = JSON.parse(strip(readFileSync(join(root, 'outils', '.secrets', 'sender.json'), 'utf8')))

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const reference = (info.details ?? []).map((d) => d.value.match(/référence\s+([\w-]+)/i)?.[1]).find(Boolean)
const subject = `Candidature au poste de ${info.title}${reference ? ` (réf. ${reference})` : ''}`

const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Lettre de motivation</title><style>
@page { size: A4; margin: 22mm 24mm; }
body { font: 11pt/1.5 Calibri, "Segoe UI", Arial, sans-serif; color: #111; margin: 0; }
.sender { line-height: 1.35; margin-bottom: 18mm; }
.sender b { font-size: 12pt; }
.recipient { margin: 0 0 12mm 90mm; line-height: 1.35; }
.subject { font-weight: 600; margin-bottom: 8mm; }
p { margin: 0 0 4.5mm; text-align: left; }
</style></head><body>
<div class="sender"><b>${esc(sender.name)}</b><br>${esc(sender.city)}<br>${esc(sender.email)}<br>${esc(sender.phone)}</div>
<div class="recipient">${esc(info.company)}<br>${esc(info.location ?? '')}</div>
<div class="subject">Objet : ${esc(subject)}</div>
${blocks.map((b) => `<p>${esc(b).replace(/\r?\n/g, '<br>')}</p>`).join('\n')}
</body></html>`

// Le CV reste tel quel (un seul exemplaire) ; seule la lettre est régénérée.
for (const f of readdirSync(out)) if (/^Lettre_motivation_/i.test(f)) rmSync(join(out, f), { force: true })

const letterBase = cvName.replace(/^CV_/i, 'Lettre_motivation_').replace(/\.pdf$/i, '')
const letterPdf = join(out, `${letterBase}.pdf`)
const tmp = join(tmpdir(), `lettre-${slug}-${Date.now()}.html`)
writeFileSync(tmp, html, 'utf8')
execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${letterPdf}`, pathToFileURL(tmp).href], { stdio: 'ignore' })
rmSync(tmp)

const pages = (readFileSync(letterPdf, 'latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length
console.log(`envoi/${folderName}/`)
for (const f of readdirSync(out)) console.log(`  ${f}`)
console.log(`lettre : ${pages} page${pages > 1 ? 's' : ''}${pages > 1 ? ' (trop longue : raccourcir)' : ''}`)
if (!(info.checks?.cv && info.checks?.letter)) {
  console.log('ATTENTION : « CV vérifié » et/ou « Lettre vérifiée » ne sont pas cochées dans la page.')
}
process.exit(0)
