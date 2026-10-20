import { useEffect, useMemo, useState } from 'react'
import { LEVEL_COLORS } from '@/constants'
import InterviewPrep from '@/components/InterviewPrep'
import OpenQuestions from '@/components/OpenQuestions'
import Quiz from '@/components/Quiz'
import QcmButton from '@/components/ui/QcmButton'
import ReadAloud from '@/components/ui/ReadAloud'
import { Buttons } from '@/components/ui/QcmButton/styles'
import { useKnowledge } from '@/components/KnowledgeProvider'
import type { KnowledgeEntry } from '@/types'
import {
  COUNT_LABEL,
  EMPTY_LABEL,
  GENERAL_COUNTS,
  GENERAL_COUNT_LABEL,
  GENERAL_DEFAULT_COUNT,
  GENERAL_HINT,
  GENERAL_SOURCE_LABEL,
  GENERAL_START_LABEL,
  GENERAL_TITLE,
  PREP_HINT,
  PREP_OPEN_LABEL,
  PREP_TITLE,
  SEARCH_PLACEHOLDER,
  TITLE,
} from './constants'
import { ficheQuiz, generalQuiz, groupByCategory, matches } from './helpers'
import {
  Block,
  BlockTitle,
  Card,
  Category,
  Count,
  Grid,
  Head,
  Heading,
  Hint,
  Item,
  Level,
  Row,
  Search,
  Section,
  Start,
  Summary,
  TopBar,
} from './styles'
import type { KnowledgeBaseProps, QuizRun } from './types'

// Base de connaissance : toutes les fiches techniques (Firestore, kb/<id>), avec recherche plein texte, groupées par catégorie.
// Sous chaque fiche : son QCM et ses questions ouvertes ; en haut : un QCM général tiré au hasard dans toute la base.
export const KnowledgeBase = ({ onOpenPdf, target, onTargetUsed }: KnowledgeBaseProps) => {
  const { kb: KNOWLEDGE_BASE, qcm: QCM, openQuestions: OPEN_QUESTIONS } = useKnowledge()
  const [query, setQuery] = useState('')
  const [count, setCount] = useState(GENERAL_DEFAULT_COUNT)
  const [run, setRun] = useState<(QuizRun & { key: number }) | null>(null)
  const [openFiche, setOpenFiche] = useState<KnowledgeEntry | null>(null)
  const [prep, setPrep] = useState(false)
  const found = useMemo(() => KNOWLEDGE_BASE.filter((e) => matches(e, query)), [KNOWLEDGE_BASE, query])
  const groups = useMemo(() => groupByCategory(found), [found])
  const total = useMemo(() => KNOWLEDGE_BASE.reduce((n, e) => n + (QCM[e.id]?.length ?? 0), 0), [KNOWLEDGE_BASE, QCM])

  const start = (title: string, rebuild: QuizRun['rebuild']) =>
    setRun((r) => ({ title, rebuild, questions: rebuild(), key: (r?.key ?? 0) + 1 }))
  const startFiche = (e: KnowledgeEntry) => start(e.label, () => ficheQuiz(e, QCM[e.id]))

  // Arrivée depuis un bouton d'une fiche dans une candidature : on lance directement son QCM ou ses questions ouvertes.
  useEffect(() => {
    if (!target) return
    const entry = KNOWLEDGE_BASE.find((e) => e.id === target.id)
    if (entry && target.mode === 'open' && OPEN_QUESTIONS[entry.id]?.length) setOpenFiche(entry)
    else if (entry && QCM[entry.id]?.length) startFiche(entry)
    onTargetUsed()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  if (run) {
    return (
      <Quiz
        key={run.key}
        title={run.title}
        questions={run.questions}
        onReplay={() => start(run.title, run.rebuild)}
        onExit={() => setRun(null)}
      />
    )
  }

  if (prep) return <InterviewPrep onBack={() => setPrep(false)} />

  if (openFiche) return <OpenQuestions entry={openFiche} onBack={() => setOpenFiche(null)} />

  return (
    <Section>
      <TopBar>
        <Heading>
          {TITLE} <Count>{COUNT_LABEL(found.length, KNOWLEDGE_BASE.length)}</Count>
        </Heading>
      </TopBar>
      <Block>
        <BlockTitle>{PREP_TITLE}</BlockTitle>
        <Hint>{PREP_HINT}</Hint>
        <Start type="button" onClick={() => setPrep(true)}>
          {PREP_OPEN_LABEL}
        </Start>
      </Block>
      <Block>
        <BlockTitle>
          {GENERAL_TITLE} ({total})
        </BlockTitle>
        <Hint>{GENERAL_HINT}</Hint>
        <Row>
          <label htmlFor="qcm-count">{GENERAL_COUNT_LABEL}</label>
          <select id="qcm-count" value={count} onChange={(e) => setCount(Number(e.target.value))}>
            {GENERAL_COUNTS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <Start type="button" onClick={() => start(GENERAL_SOURCE_LABEL, () => generalQuiz(KNOWLEDGE_BASE, QCM, count))}>
            {GENERAL_START_LABEL}
          </Start>
        </Row>
      </Block>
      <Search
        type="search"
        placeholder={SEARCH_PLACEHOLDER}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label={SEARCH_PLACEHOLDER}
      />
      {groups.length === 0 && <Hint>{EMPTY_LABEL}</Hint>}
      {groups.map(([category, entries]) => (
        <div key={category}>
          <Category>{category}</Category>
          <Grid>
            {entries.map((e) => (
              <Item key={e.id}>
                <Card heading={e.label} docs={[{ title: e.label, url: e.pdfUrl }]} onOpen={onOpenPdf}>
                  <Head>
                    <strong>{e.label}</strong>
                    <Level $color={LEVEL_COLORS[e.level]}>{e.level}</Level>
                  </Head>
                  <Summary>{e.summary}</Summary>
                </Card>
                <Buttons>
                  <ReadAloud label="🔊 Lire la fiche" text={e.speech ?? `${e.label}. ${e.text}`} />
                  {(QCM[e.id]?.length ?? 0) > 0 && <QcmButton count={QCM[e.id].length} onClick={() => startFiche(e)} />}
                  {(OPEN_QUESTIONS[e.id]?.length ?? 0) > 0 && (
                    <QcmButton kind="open" count={OPEN_QUESTIONS[e.id].length} onClick={() => setOpenFiche(e)} />
                  )}
                </Buttons>
              </Item>
            ))}
          </Grid>
        </div>
      ))}
    </Section>
  )
}
