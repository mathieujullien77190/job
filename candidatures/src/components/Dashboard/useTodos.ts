import { useCallback, useEffect, useRef, useState } from 'react'
import { saveTodos, subscribeTodos } from '@/helpers/api'
import type { Todo } from '@/types'

type Load = 'loading' | 'ready' | 'error'

// Les post-its viennent de Firestore (meta/todos) et y sont réécrits à chaque changement : aucun localStorage.
export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [load, setLoad] = useState<Load>('loading')
  const [saveError, setSaveError] = useState<string | null>(null)
  const latest = useRef<Todo[]>([])

  useEffect(
    () =>
      subscribeTodos(
        (fresh) => {
          latest.current = fresh
          setTodos(fresh)
          setLoad('ready')
        },
        () => setLoad('error'),
      ),
    [],
  )

  const change = useCallback((update: (current: Todo[]) => Todo[]) => {
    const next = update(latest.current)
    latest.current = next
    setTodos(next)
    saveTodos(next).then(
      () => setSaveError(null),
      (error: unknown) => setSaveError(error instanceof Error ? error.message : 'Enregistrement impossible'),
    )
  }, [])

  const add = useCallback((todo: Todo) => change((c) => [...c, todo]), [change])
  const patch = useCallback(
    (id: string, part: Partial<Todo>) => change((c) => c.map((t) => (t.id === id ? { ...t, ...part } : t))),
    [change],
  )
  const remove = useCallback((id: string) => change((c) => c.filter((t) => t.id !== id)), [change])

  return { todos, load, saveError, add, patch, remove }
}
