import type { PrepSection } from './types'

// Découpe le Markdown en sections à chaque titre de niveau 2 (« ## Titre »).
export const parseSections = (markdown: string): PrepSection[] =>
  markdown
    .split(/^## +/m)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk, i) => {
      const [title, ...rest] = chunk.split('\n')
      return { id: String(i), title: title.trim(), body: rest.join('\n').trim() }
    })
