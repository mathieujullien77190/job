import { getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { vaultCollection, vaultDoc } from '@/helpers/firestore'
import type { AnswersByFiche, Editable, LetterProposal, ServerApplication, Todo } from '@/types'

// Données dans Firestore sous vault/<secret>/ (voir helpers/firestore.ts) :
//   applications/<slug>  une candidature (tout en texte : lettre, modifs du CV, offre, propositions…)
//   meta/todos           { items: Todo[] }
//   answers/<fiche>      { answers: { <qid>: { text, savedAt, review? } } }
// onSnapshot garde la page à jour quand une donnée change ailleurs (Claude Code, autre appareil).

type Unsubscribe = () => void
type OnError = (error: Error) => void

export const subscribeApplications = (
  onData: (items: ServerApplication[]) => void,
  onError: OnError,
): Unsubscribe =>
  onSnapshot(
    vaultCollection('applications'),
    (snap) => onData(snap.docs.map((d) => ({ ...(d.data() as ServerApplication), id: d.id }))),
    onError,
  )

// mixte : enregistre le texte comme proposition « 0 » (« 0. Mixte »)
export type SavePatch = Partial<Editable> & { mixte?: string }

const withMixte = (proposals: LetterProposal[] = [], text: string): LetterProposal[] => {
  const trimmed = text.trim()
  const index = proposals.findIndex((p) => p.label.startsWith('0.'))
  return index >= 0
    ? proposals.map((p, i) => (i === index ? { ...p, text: trimmed } : p))
    : [{ id: '0-Mixte.txt', label: '0. Mixte', text: trimmed }, ...proposals]
}

export const saveApplication = async (id: string, patch: SavePatch): Promise<void> => {
  const { mixte, ...fields } = patch
  const ref = vaultDoc('applications', id)
  const update: Record<string, unknown> = { ...fields }
  if (mixte !== undefined) {
    const current = (await getDoc(ref)).data() as Partial<ServerApplication> | undefined
    update.proposals = withMixte(current?.proposals, mixte)
  }
  // merge : seuls les champs modifiés sont écrits, le reste de la candidature est conservé
  await setDoc(ref, update, { merge: true })
}

export const subscribeTodos = (onData: (todos: Todo[]) => void, onError: OnError): Unsubscribe =>
  onSnapshot(
    vaultDoc('meta', 'todos'),
    (snap) => onData((snap.data() as { items?: Todo[] } | undefined)?.items ?? []),
    onError,
  )

export const saveTodos = (todos: Todo[]): Promise<void> => setDoc(vaultDoc('meta', 'todos'), { items: todos })

export const subscribeAnswers = (onData: (answers: AnswersByFiche) => void, onError: OnError): Unsubscribe =>
  onSnapshot(
    vaultCollection('answers'),
    (snap) =>
      onData(
        Object.fromEntries(snap.docs.map((d) => [d.id, (d.data() as { answers?: AnswersByFiche[string] }).answers ?? {}])),
      ),
    onError,
  )

// Collection entière (kb, qcm, openQuestions, cv…) : chaque document avec son id, mise à jour en direct.
export const subscribeCollection = <T>(
  name: string,
  onData: (docs: (T & { id: string })[]) => void,
  onError: OnError,
): Unsubscribe =>
  onSnapshot(
    vaultCollection(name),
    (snap) => onData(snap.docs.map((d) => ({ ...(d.data() as T), id: d.id }))),
    onError,
  )

// Document unique de la collection meta (interview, sites…).
export const subscribeMeta = <T>(id: string, onData: (data: T | undefined) => void, onError: OnError): Unsubscribe =>
  onSnapshot(vaultDoc('meta', id), (snap) => onData(snap.data() as T | undefined), onError)

// Écrit le texte d'une réponse ; la correction (review) de Claude Code est conservée (merge).
export const saveAnswer = async (fiche: string, qid: string, text: string): Promise<string> => {
  const savedAt = new Date().toISOString()
  await setDoc(vaultDoc('answers', fiche), { answers: { [qid]: { text, savedAt } } }, { merge: true })
  return savedAt
}
