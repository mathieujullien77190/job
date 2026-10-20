import type { Keyword, PdfSelection } from '@/types'

export type KeywordListProps = {
  keywords: Keyword[]
  offer?: string // texte de l'annonce, pour afficher la ligne où le mot-clé apparaît
  onOpenPdf: (selection: PdfSelection) => void
  onQcm: (ficheId: string, mode?: 'qcm' | 'open') => void // ouvre le QCM de la fiche
}
