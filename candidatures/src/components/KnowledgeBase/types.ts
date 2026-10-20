import type { QuizQuestion } from '@/components/Quiz/types'
import type { PdfSelection } from '@/types'

// Fiche dont on veut lancer le QCM ou les questions ouvertes depuis un bouton d'une candidature (nonce : relancer la même fiche reste possible).
export type KnowledgeTarget = { id: string; nonce: number; mode: 'qcm' | 'open' }

export type KnowledgeBaseProps = {
  onOpenPdf: (selection: PdfSelection) => void
  target: KnowledgeTarget | null
  onTargetUsed: () => void
}

// Série en cours : titre affiché et questions déjà mélangées ; rebuild produit une nouvelle série (« Rejouer »).
export type QuizRun = { title: string; questions: QuizQuestion[]; rebuild: () => QuizQuestion[] }
