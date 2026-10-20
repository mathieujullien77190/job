import type { ComponentProps } from 'react'
import type { PdfSelection } from '@/types'

export type PdfLinkProps = Omit<ComponentProps<'a'>, 'href' | 'onClick'> & {
  heading: string // titre affiché au-dessus du PDF
  docs: PdfSelection['docs'] // un seul PDF, ou plusieurs (affichés en onglets)
  active?: number // onglet à ouvrir (0 par défaut)
  onOpen: (selection: PdfSelection) => void
}
