import { useCallback, useEffect, useRef, useState } from 'react'
import { saveAnswer, subscribeAnswers } from '@/helpers/api'
import type { AnswersByFiche } from '@/types'
import { SAVE_DELAY_MS } from './constants'

type Load = 'loading' | 'ready' | 'error'
export type SaveState = 'idle' | 'saving' | 'saved' | 'error'

// Les réponses longues viennent de Firestore (answers/<fiche>) et y sont réécrites : aucun localStorage.
// Les corrections de Claude Code (review) arrivent par le même document : la page se met à jour toute seule.
export const useAnswers = () => {
  const [answers, setAnswers] = useState<AnswersByFiche>({})
  const [load, setLoad] = useState<Load>('loading')
  const [states, setStates] = useState<Record<string, SaveState>>({})
  const [drafts, setDrafts] = useState<Record<string, string>>({}) // texte en cours de frappe, pas encore relu depuis le fichier
  const timers = useRef(new Map<string, number>())

  useEffect(
    () =>
      subscribeAnswers(
        (fresh) => {
          setAnswers(fresh)
          setLoad('ready')
        },
        () => setLoad('error'),
      ),
    [],
  )

  const edit = useCallback((fiche: string, qid: string, text: string) => {
    const key = `${fiche}/${qid}`
    setDrafts((d) => ({ ...d, [key]: text }))
    setStates((s) => ({ ...s, [key]: 'saving' }))
    window.clearTimeout(timers.current.get(key))
    timers.current.set(
      key,
      window.setTimeout(() => {
        saveAnswer(fiche, qid, text).then(
          (savedAt) => {
            setStates((s) => ({ ...s, [key]: 'saved' }))
            setAnswers((a) => ({ ...a, [fiche]: { ...a[fiche], [qid]: { ...a[fiche]?.[qid], text, savedAt } } }))
            setDrafts((d) => {
              const { [key]: _done, ...rest } = d
              return rest
            })
          },
          () => setStates((s) => ({ ...s, [key]: 'error' })),
        )
      }, SAVE_DELAY_MS),
    )
  }, [])

  return { answers, drafts, states, load, edit }
}
