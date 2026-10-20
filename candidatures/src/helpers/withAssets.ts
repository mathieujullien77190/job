import type { Knowledge } from '@/components/KnowledgeProvider'
import { htmlUrl } from '@/helpers/htmlUrl'
import type { Application, ServerApplication } from '@/types'

// Ajoute à une candidature son CV (HTML de Firestore, affiché depuis une URL blob) et les fiches de ses mots-clés.
export const withAssets = (a: ServerApplication, knowledge: Knowledge): Application => {
  const cv = knowledge.cvs[a.id]
  const ficheOf = new Map(knowledge.kb.map((e) => [e.id, e.pdfUrl]))
  const { keywords = [], ...rest } = a
  return {
    ...rest,
    cvUrl: cv ? htmlUrl(cv.clean) : undefined,
    cvPreviewUrl: cv?.annotated ? htmlUrl(cv.annotated) : undefined,
    cvModified: cv && knowledge.baseCv ? cv.clean.trim() !== knowledge.baseCv.trim() : undefined,
    keywords: keywords.flatMap((k) => (ficheOf.has(k.id) ? [{ ...k, pdfUrl: ficheOf.get(k.id)! }] : [])),
  }
}
