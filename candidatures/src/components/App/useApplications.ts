import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useKnowledge } from '@/components/KnowledgeProvider'
import { saveApplication, subscribeApplications } from '@/helpers/api'
import { withAssets } from '@/helpers/withAssets'
import type { Editable, ServerApplication } from '@/types'
import { SAVE_DELAY_MS } from './constants'

type Load = 'loading' | 'ready' | 'error'

// Les candidatures viennent de Firestore et y sont réécrites : aucun localStorage.
export const useApplications = () => {
  const knowledge = useKnowledge()
  const [raw, setRaw] = useState<ServerApplication[]>([])
  const [load, setLoad] = useState<Load>('loading')
  const [saveError, setSaveError] = useState<string | null>(null)
  const pending = useRef(new Map<string, Partial<Editable>>()) // modifs locales pas encore écrites
  const timers = useRef(new Map<string, number>())

  // Abonnement Firestore : chaque changement (page, Claude Code, autre appareil) met la liste à jour.
  useEffect(
    () =>
      subscribeApplications(
        (fresh) => {
          // une modif en cours de saisie n'est pas écrasée par une relecture
          setRaw(fresh.map((a) => ({ ...a, proposals: a.proposals ?? [], ...pending.current.get(a.id) })))
          setLoad('ready')
        },
        () => setLoad('error'),
      ),
    [],
  )

  // CV et fiches (aussi dans Firestore) sont rattachés aux candidatures dès qu'ils arrivent.
  const items = useMemo(() => raw.map((a) => withAssets(a, knowledge)), [raw, knowledge])

  const flush = useCallback(async (id: string) => {
    const patch = pending.current.get(id)
    if (!patch) return
    try {
      await saveApplication(id, patch)
      setSaveError(null)
      if (pending.current.get(id) === patch) pending.current.delete(id) // pas de nouvelle modif entre-temps
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Enregistrement impossible')
    }
  }, [])

  const update = useCallback(
    (id: string, patch: Partial<Editable>) => {
      setRaw((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)))
      pending.current.set(id, { ...pending.current.get(id), ...patch })
      window.clearTimeout(timers.current.get(id))
      // le statut est enregistré tout de suite, le texte après une courte pause de frappe
      const delay = patch.status !== undefined ? 0 : SAVE_DELAY_MS
      timers.current.set(id, window.setTimeout(() => void flush(id), delay))
    },
    [flush],
  )

  // Enregistre le texte comme proposition « 0 » (Mixte). Rejette si l'écriture échoue : le bouton affiche l'erreur.
  const saveMixte = useCallback(async (id: string, text: string) => {
    await saveApplication(id, { mixte: text })
    setRaw((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a
        const index = a.proposals.findIndex((p) => p.label.startsWith('0.'))
        const proposals =
          index >= 0
            ? a.proposals.map((p, i) => (i === index ? { ...p, text: text.trim() } : p))
            : [{ id: '0-Mixte.txt', label: '0. Mixte', text: text.trim() }, ...a.proposals]
        return { ...a, proposals }
      }),
    )
  }, [])

  return { items, load, saveError, update, saveMixte }
}
