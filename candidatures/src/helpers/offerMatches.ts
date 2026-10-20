import { MAX_MATCH_LINES } from '@/constants'
import type { TextSegment } from '@/types'

const escapeRegExp = (s: string): string => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')

// Mot entier : « Java » ne doit pas matcher « JavaScript ». Plus long d'abord pour préférer « Context API » à « API ».
export const termsRegExp = (terms: string[]): RegExp | null => {
  const parts = [...new Set(terms.filter(Boolean))]
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
  return parts.length ? new RegExp(`(?<![\\p{L}\\p{N}])(?:${parts.join('|')})(?![\\p{L}\\p{N}])`, 'giu') : null
}

// Lignes de l'offre où apparaît un des termes (le lien de l'annonce est ignoré).
export const findLines = (offer: string | undefined, terms: string[], max = MAX_MATCH_LINES): string[] => {
  const re = termsRegExp(terms)
  if (!offer || !re) return []
  return offer
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !/^lien\s*:/i.test(l) && !/https?:\/\//.test(l))
    .filter((l) => {
      re.lastIndex = 0
      return re.test(l)
    })
    .slice(0, max)
}

export const highlight = (line: string, terms: string[]): TextSegment[] => {
  const re = termsRegExp(terms)
  if (!re) return [{ text: line, hit: false }]
  const out: TextSegment[] = []
  let last = 0
  for (const m of line.matchAll(re)) {
    if (m.index > last) out.push({ text: line.slice(last, m.index), hit: false })
    out.push({ text: m[0], hit: true })
    last = m.index + m[0].length
  }
  if (last < line.length) out.push({ text: line.slice(last), hit: false })
  return out
}
