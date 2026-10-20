import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { subscribeCollection, subscribeMeta } from '@/helpers/api'
import { htmlUrl } from '@/helpers/htmlUrl'
import type { KnowledgeEntry, OpenQuestion, QcmQuestion, SearchSite } from '@/types'
import type { CvSource, Knowledge } from './types'

type KbDoc = Omit<KnowledgeEntry, 'pdfUrl'> & { html: string; order: number }

const EMPTY: Knowledge = { kb: [], qcm: {}, openQuestions: {}, interview: '', sites: [], cvs: {} }
const KnowledgeContext = createContext<Knowledge>(EMPTY)

export const useKnowledge = (): Knowledge => useContext(KnowledgeContext)

const noop = (): void => {}

// Tout le contenu « statique » (fiches, QCM, questions ouvertes, notes d'entretien, sites, CV) vient de Firestore.
export const KnowledgeProvider = ({ children }: { children: ReactNode }) => {
  const [kb, setKb] = useState<KnowledgeEntry[]>([])
  const [qcm, setQcm] = useState<Knowledge['qcm']>({})
  const [openQuestions, setOpenQuestions] = useState<Knowledge['openQuestions']>({})
  const [interview, setInterview] = useState('')
  const [sites, setSites] = useState<SearchSite[]>([])
  const [baseCv, setBaseCv] = useState<string>()
  const [cvs, setCvs] = useState<Knowledge['cvs']>({})

  useEffect(() => {
    const stops = [
      subscribeCollection<KbDoc>(
        'kb',
        (docs) =>
          setKb(
            [...docs]
              .sort((a, b) => a.order - b.order)
              .map(({ html, order: _order, ...entry }) => ({ ...entry, pdfUrl: htmlUrl(html) })),
          ),
        noop,
      ),
      subscribeCollection<{ questions: QcmQuestion[] }>(
        'qcm',
        (docs) => setQcm(Object.fromEntries(docs.map((d) => [d.id, d.questions]))),
        noop,
      ),
      subscribeCollection<{ questions: OpenQuestion[] }>(
        'openQuestions',
        (docs) => setOpenQuestions(Object.fromEntries(docs.map((d) => [d.id, d.questions]))),
        noop,
      ),
      subscribeMeta<{ text: string }>('interview', (d) => setInterview(d?.text ?? ''), noop),
      subscribeMeta<{ items: SearchSite[] }>('sites', (d) => setSites(d?.items ?? []), noop),
      subscribeCollection<{ html?: string } & Partial<CvSource>>(
        'cv',
        (docs) => {
          setBaseCv(docs.find((d) => d.id === 'base')?.html)
          setCvs(
            Object.fromEntries(
              docs
                .filter((d) => d.id !== 'base' && d.clean)
                .map((d) => [d.id, { annotated: d.annotated ?? '', clean: d.clean! }]),
            ),
          )
        },
        noop,
      ),
    ]
    return () => stops.forEach((stop) => stop())
  }, [])

  const value = useMemo(
    () => ({ kb, qcm, openQuestions, interview, sites, baseCv, cvs }),
    [kb, qcm, openQuestions, interview, sites, baseCv, cvs],
  )
  return <KnowledgeContext.Provider value={value}>{children}</KnowledgeContext.Provider>
}
