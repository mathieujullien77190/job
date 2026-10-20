import type { QcmButtonProps } from './types'
import { Button } from './styles'

const LABELS = {
  qcm: { text: 'QCM', title: 'QCM de la fiche' },
  open: { text: 'Questions ouvertes', title: 'Questions à réponse longue de la fiche' },
}

// Bouton d'une fiche : lance son QCM ou ses questions ouvertes (le parent ouvre la vue QCM).
const QcmButton = ({ kind = 'qcm', count, onClick }: QcmButtonProps) => (
  <Button type="button" onClick={onClick} title={`${LABELS[kind].title} (${count} questions)`}>
    {LABELS[kind].text} · {count} q.
  </Button>
)

export default QcmButton
