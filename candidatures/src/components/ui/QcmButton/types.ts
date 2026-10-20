export type QcmButtonProps = {
  kind?: 'qcm' | 'open' // QCM à choix multiples (par défaut) ou questions à réponse longue
  count: number // nombre de questions de la fiche
  onClick: () => void
}
