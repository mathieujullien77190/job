import { useMemo, useState } from 'react'
import ReadAloud from '@/components/ui/ReadAloud'
import {
  EXIT_LABEL,
  FINISH_LABEL,
  LETTERS,
  MISTAKES_TITLE,
  NEXT_LABEL,
  PERFECT_LABEL,
  REPLAY_LABEL,
  RETRY_WRONG_LABEL,
  RIGHT_LABEL,
  WRONG_LABEL,
} from './constants'
import { percent, verdict } from './helpers'
import {
  Actions,
  Back,
  Card,
  Choice,
  Choices,
  Feedback,
  Meta,
  Mistakes,
  Primary,
  Progress,
  Question,
  Score,
  Secondary,
  Top,
  Wrap,
} from './styles'
import type { QuizProps, QuizQuestion } from './types'

// Une question à la fois : on choisit, la correction et l'explication s'affichent tout de suite, puis résultat final.
export const Quiz = ({ title, questions, onReplay, onExit }: QuizProps) => {
  const [round, setRound] = useState<QuizQuestion[]>(questions) // série en cours (les erreurs seules au « refaire »)
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [wrong, setWrong] = useState<QuizQuestion[]>([])
  const [done, setDone] = useState(false)

  const current = round[index]
  const answered = picked !== null
  const rightCount = round.length - wrong.length
  const progress = useMemo(() => percent(index + (answered ? 1 : 0), round.length), [index, answered, round.length])

  const choose = (choice: number) => {
    if (answered) return
    setPicked(choice)
    if (choice !== current.answer) setWrong((w) => [...w, current])
  }

  const next = () => {
    if (index + 1 >= round.length) {
      setDone(true)
      return
    }
    setIndex(index + 1)
    setPicked(null)
  }

  const retryWrong = () => {
    setRound(wrong)
    setWrong([])
    setIndex(0)
    setPicked(null)
    setDone(false)
  }

  if (done) {
    return (
      <Wrap>
        <Top>
          <Back type="button" onClick={onExit}>{EXIT_LABEL}</Back>
          <Meta>{title}</Meta>
        </Top>
        <Card>
          <Score>
            {rightCount} / {round.length} <small>({percent(rightCount, round.length)} %)</small>
          </Score>
          <p>{wrong.length === 0 ? PERFECT_LABEL : verdict(rightCount, round.length)}</p>
          <Actions>
            {wrong.length > 0 && <Primary type="button" onClick={retryWrong}>{RETRY_WRONG_LABEL} ({wrong.length})</Primary>}
            <Secondary type="button" onClick={onReplay}>{REPLAY_LABEL}</Secondary>
            <Secondary type="button" onClick={onExit}>{EXIT_LABEL}</Secondary>
          </Actions>
        </Card>
        {wrong.length > 0 && (
          <Card>
            <h3>{MISTAKES_TITLE}</h3>
            <Mistakes>
              {wrong.map((w) => (
                <li key={w.q}>
                  <Meta>{w.source}</Meta>
                  <strong>{w.q}</strong>
                  <p>
                    {LETTERS[w.answer]}. {w.choices[w.answer]}
                  </p>
                  <p>{w.explain}</p>
                </li>
              ))}
            </Mistakes>
          </Card>
        )}
      </Wrap>
    )
  }

  return (
    <Wrap>
      <Top>
        <Back type="button" onClick={onExit}>{EXIT_LABEL}</Back>
        <Meta>
          {title} · question {index + 1} / {round.length}
        </Meta>
      </Top>
      <Progress role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <span style={{ width: `${progress}%` }} />
      </Progress>
      <Card>
        <Meta>{current.source}</Meta>
        <Question>{current.q}</Question>
        <ReadAloud showRate text={`${current.q}. ${current.choices.map((c, i) => `Réponse ${LETTERS[i]}. ${c}`).join('. ')}`} />
        <Choices>
          {current.choices.map((c, i) => {
            const state = !answered ? 'idle' : i === current.answer ? (picked === i ? 'right' : 'missed') : picked === i ? 'wrong' : 'idle'
            return (
              <li key={c}>
                <Choice type="button" $state={state} $locked={answered} aria-pressed={picked === i} onClick={() => choose(i)}>
                  <b>{LETTERS[i]}</b>
                  <span>{c}</span>
                </Choice>
              </li>
            )
          })}
        </Choices>
        {answered && (
          <>
            <Feedback $right={picked === current.answer} role="status">
              <strong>{picked === current.answer ? RIGHT_LABEL : WRONG_LABEL}</strong>
              {current.explain}
              <ReadAloud label="🔊 Lire l'explication" text={current.explain} />
            </Feedback>
            <Actions>
              <Primary type="button" onClick={next}>
                {index + 1 >= round.length ? FINISH_LABEL : NEXT_LABEL}
              </Primary>
            </Actions>
          </>
        )}
      </Card>
    </Wrap>
  )
}
