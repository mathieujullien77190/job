import type { Application, Checks, PdfSelection, Status } from '@/types'

export type ApplicationCardProps = {
  item: Application
  selected: boolean // candidature dont les CV sont affichés dans le panneau de droite
  onSelect: () => void
  onStatus: (status: Status) => void
  onMessage: (message: string) => void
  onCvChanges: (text: string) => void
  onChecks: (checks: Checks) => void // « CV vérifié » / « lettre vérifiée »
  onSaveMixte: (text: string) => Promise<void> // enregistre la lettre comme proposition « 0. Mixte »
  onOpenPdf: (selection: PdfSelection) => void
  onQcm: (ficheId: string, mode?: 'qcm' | 'open') => void
}
