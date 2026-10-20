import { CHUNK_MAX, LANG_PREFIX, TITLE_PAUSE_MS } from './constants'

// Score d'une voix : les voix « Natural » / « Online » d'Edge sont les plus naturelles, puis les voix Google, puis les autres.
const score = (voice: SpeechSynthesisVoice): number => {
  const name = voice.name.toLowerCase()
  let s = 0
  if (name.includes('natural')) s += 100
  if (name.includes('online')) s += 50
  if (name.includes('google')) s += 30
  if (voice.lang.toLowerCase().replace('_', '-') === 'fr-fr') s += 5
  if (!voice.localService) s += 2
  return s
}

export const frenchVoices = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] =>
  voices.filter((v) => v.lang.toLowerCase().startsWith(LANG_PREFIX)).sort((a, b) => score(b) - score(a))

export const bestFrenchVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined => frenchVoices(voices)[0]

export const isNatural = (voice: SpeechSynthesisVoice | undefined): boolean => !!voice && /natural/i.test(voice.name)

// Markdown ou texte brut vers texte à lire : retire la mise en forme (titres, gras, code, liens, puces).
export const toSpeech = (text: string): string =>
  text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s{0,3}#{1,6}\s*/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/\|/g, ' ')
    .replace(/[*_~]/g, '')
    .replace(/\s*\n\s*/g, '. ')
    .replace(/\.\s*\.+/g, '.')
    .replace(/\s+/g, ' ')
    .trim()

// Découpe en phrases puis regroupe jusqu'à CHUNK_MAX caractères pour que la voix garde son rythme sans couper un mot.
export const chunkText = (text: string): string[] => {
  // Coupe aux ponctuations (point, virgule, point-virgule, deux-points) : les morceaux gardent une intonation naturelle.
  const sentences = text.match(/[^.!?;:,]+[.!?;:,]*\s*/g) ?? [text]
  const chunks: string[] = []
  let current = ''
  for (const s of sentences) {
    if (current && (current + s).length > CHUNK_MAX) {
      chunks.push(current.trim())
      current = ''
    }
    current += s
    while (current.length > CHUNK_MAX * 1.6) {
      const cut = current.lastIndexOf(' ', CHUNK_MAX)
      const at = cut > 40 ? cut : CHUNK_MAX
      chunks.push(current.slice(0, at).trim())
      current = current.slice(at)
    }
  }
  if (current.trim()) chunks.push(current.trim())
  return chunks
}

export type SpeechChunk = { text: string; pause: number } // pause : silence en ms après ce morceau (utilisé après un titre)

const HEADING = /^\s{0,3}#{1,6}\s+(.*)$/

// Texte (Markdown ou texte structuré par des « # ») vers morceaux à lire : sans code ni tableaux, avec un silence après chaque titre.
export const speechChunks = (raw: string): SpeechChunk[] => {
  const lines = raw
    .replace(/```[\s\S]*?```/g, '\n')
    .split('\n')
    .filter((l) => !l.trim().startsWith('|'))

  // Blocs : un titre, ou un paragraphe (lignes consécutives hors titre)
  type Block = { title?: string; body?: string }
  const blocks: Block[] = []
  let buffer: string[] = []
  const flush = () => {
    if (buffer.join('').trim()) blocks.push({ body: buffer.join('\n') })
    buffer = []
  }
  for (const line of lines) {
    const m = line.match(HEADING)
    if (m) {
      flush()
      blocks.push({ title: m[1] })
    } else buffer.push(line)
  }
  flush()

  const chunks: SpeechChunk[] = []
  blocks.forEach((b, i) => {
    if (b.title !== undefined) {
      // un titre sans contenu (section faite seulement d'un tableau ou de code) n'est pas lu
      if (!blocks[i + 1] || blocks[i + 1].title !== undefined) return
      const title = toSpeech(b.title)
      if (title) chunks.push({ text: `${title}.`, pause: TITLE_PAUSE_MS })
    } else {
      for (const text of chunkText(toSpeech(b.body ?? ''))) chunks.push({ text, pause: 0 })
    }
  })
  return chunks
}
