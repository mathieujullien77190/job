import ReadAloud from '@/components/ui/ReadAloud'
import { useKnowledge } from '@/components/KnowledgeProvider'
import type { Answer } from '@/types'
import { Back, Empty, Hint, OpenCard, Questions, Review, SaveState as SaveNote, Section, Heading } from './styles'
import {
  BACK_LABEL,
  EMPTY_ANSWER_LABEL,
  ERROR_LABEL,
  IMPROVED_LABEL,
  LOAD_ERROR_LABEL,
  OUTDATED_LABEL,
  PENDING_LABEL,
  PLACEHOLDER,
  SAVED_LABEL,
  SAVING_LABEL,
  STATUS_LABELS,
} from './constants'
import type { OpenQuestionsProps } from './types'
import { useAnswers } from './useAnswers'

// La correction compte seulement si elle est plus récente que la dernière modification du texte.
const reviewIsCurrent = (a: Answer | undefined): boolean =>
  !!a?.review && Date.parse(a.review.reviewedAt) >= Date.parse(a.savedAt)

// Questions à réponse longue d'une fiche : on écrit, le texte est enregistré dans Firestore (answers/<fiche>) ;
// la correction est ajoutée dans le même document par Claude Code (skill valider-reponses) et s'affiche ici.
export const OpenQuestions = ({ entry, onBack }: OpenQuestionsProps) => {
  const { openQuestions } = useKnowledge()
  const questions = openQuestions[entry.id] ?? []
  const { answers, drafts, states, load, edit } = useAnswers()

  return (
    <Section>
      <Back type="button" onClick={onBack}>{BACK_LABEL}</Back>
      <Heading>{entry.label}</Heading>
      {load === 'error' && <Hint role="alert">{LOAD_ERROR_LABEL}</Hint>}
      {questions.length === 0 && <Empty>{EMPTY_ANSWER_LABEL}</Empty>}
      <Questions>
        {questions.map((question, i) => {
          const key = `${entry.id}/${question.id}`
          const saved = answers[entry.id]?.[question.id]
          const text = drafts[key] ?? saved?.text ?? ''
          const state = states[key]
          const current = reviewIsCurrent(saved)
          return (
            <OpenCard key={question.id}>
              <h3>
                {i + 1}. {question.q}
              </h3>
              <ReadAloud text={question.q} />
              <textarea
                value={text}
                placeholder={PLACEHOLDER}
                aria-label={question.q}
                onChange={(e) => edit(entry.id, question.id, e.target.value)}
              />
              <SaveNote>
                {state === 'saving' && SAVING_LABEL}
                {state === 'saved' && SAVED_LABEL}
                {state === 'error' && ERROR_LABEL}
              </SaveNote>
              {saved?.review && current && (
                <Review $status={saved.review.status}>
                  <strong>{STATUS_LABELS[saved.review.status]}</strong>
                  <p>{saved.review.feedback}</p>
                  {saved.review.improved && (
                    <p>
                      <b>{IMPROVED_LABEL} :</b> {saved.review.improved}
                    </p>
                  )}
                </Review>
              )}
              {text.trim() !== '' && saved?.review && !current && <Review $status="pending">{OUTDATED_LABEL}</Review>}
              {text.trim() !== '' && !saved?.review && <Review $status="pending">{PENDING_LABEL}</Review>}
            </OpenCard>
          )
        })}
      </Questions>
    </Section>
  )
}
