import type { KnowledgeEntry, OpenQuestion, QcmQuestion, SearchSite } from '@/types'

// CV d'une candidature (cv/<slug>) : HTML annoté (jaune = nouveau, rouge barré = ancien) et HTML propre à envoyer.
export type CvSource = { annotated: string; clean: string }

export type Knowledge = {
  kb: KnowledgeEntry[] // fiches, dans l'ordre de la bibliothèque
  qcm: Record<string, QcmQuestion[]>
  openQuestions: Record<string, OpenQuestion[]>
  interview: string // notes de préparation à l'entretien (Markdown)
  sites: SearchSite[]
  baseCv?: string // HTML du CV de base
  cvs: Record<string, CvSource> // par id de candidature
}
