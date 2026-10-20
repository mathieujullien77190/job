import { LEVEL_COLORS } from '@/constants'
import { findLines, highlight } from '@/helpers/offerMatches'
import QcmButton from '@/components/ui/QcmButton'
import { Buttons } from '@/components/ui/QcmButton/styles'
import { useKnowledge } from '@/components/KnowledgeProvider'
import { Head, Item, Level, Line, List, OpenLabel, Summary } from './styles'
import type { KeywordListProps } from './types'

export const KeywordList = ({ keywords, offer, onOpenPdf, onQcm }: KeywordListProps) => {
  const { qcm: QCM, openQuestions: OPEN_QUESTIONS } = useKnowledge()
  return (
  <List>
    {keywords.map((k) => (
      <li key={k.id}>
        <Item heading={k.label} docs={[{ title: k.label, url: k.pdfUrl }]} onOpen={onOpenPdf}>
          <Head>
            <strong>{k.label}</strong>
            <Level $color={LEVEL_COLORS[k.level]}>{k.level}</Level>
          </Head>
          {findLines(offer, k.terms).map((line) => (
            <Line key={line}>
              {highlight(line, k.terms).map((s, i) =>
                s.hit ? <mark key={i}>{s.text}</mark> : <span key={i}>{s.text}</span>,
              )}
            </Line>
          ))}
          <Summary>{k.summary}</Summary>
          <OpenLabel>Ouvrir la fiche ↗</OpenLabel>
        </Item>
        <Buttons>
          {(QCM[k.id]?.length ?? 0) > 0 && <QcmButton count={QCM[k.id].length} onClick={() => onQcm(k.id)} />}
          {(OPEN_QUESTIONS[k.id]?.length ?? 0) > 0 && <QcmButton kind="open" count={OPEN_QUESTIONS[k.id].length} onClick={() => onQcm(k.id, 'open')} />}
        </Buttons>
      </li>
    ))}
  </List>
  )
}
