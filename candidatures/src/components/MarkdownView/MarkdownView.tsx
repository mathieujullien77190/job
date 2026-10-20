import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Scroll } from './styles'
import type { MarkdownViewProps } from './types'

// Markdown rendu (react-markdown : pas de HTML brut, donc sûr) dans une zone à défilement de hauteur limitée.
export const MarkdownView = ({ source, maxHeight = 420 }: MarkdownViewProps) => (
  <Scroll $maxHeight={maxHeight} tabIndex={0} aria-label="Contenu mis en forme">
    <Markdown remarkPlugins={[remarkGfm]}>{source}</Markdown>
  </Scroll>
)
