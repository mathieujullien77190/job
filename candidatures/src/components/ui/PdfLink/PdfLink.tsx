import type { PdfLinkProps } from './types'

// Lien vers un PDF : un clic simple l'affiche dans le panneau de droite ; Ctrl/Maj/clic milieu l'ouvrent dans un onglet.
const PdfLink = ({ heading, docs, active = 0, onOpen, ...rest }: PdfLinkProps) => (
  <a
    href={docs[active].url}
    target="_blank"
    rel="noreferrer"
    onClick={(e) => {
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey) return
      e.preventDefault()
      onOpen({ heading, docs, active })
    }}
    {...rest}
  />
)

export default PdfLink
