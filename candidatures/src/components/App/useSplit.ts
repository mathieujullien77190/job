import { useCallback, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import { SPLIT_DEFAULT, SPLIT_KEY_STEP, SPLIT_MAX, SPLIT_MIN } from '@/constants'
import { clampSplit } from './helpers'

// Largeur de la colonne de gauche en %, ajustable en faisant glisser (ou au clavier) la barre centrale.
// Non mémorisée : le site n'écrit rien dans le navigateur.
export const useSplit = () => {
  const [left, setLeft] = useState(SPLIT_DEFAULT)

  const onPointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId) // garde le glissement même au-dessus du PDF (iframe)
  }, [])

  const onPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
    setLeft(clampSplit((e.clientX / window.innerWidth) * 100))
  }, [])

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') setLeft((l) => clampSplit(l - SPLIT_KEY_STEP))
    else if (e.key === 'ArrowRight') setLeft((l) => clampSplit(l + SPLIT_KEY_STEP))
    else if (e.key === 'Home') setLeft(SPLIT_MIN)
    else if (e.key === 'End') setLeft(SPLIT_MAX)
    else return
    e.preventDefault()
  }, [])

  const reset = useCallback(() => setLeft(SPLIT_DEFAULT), [])

  return { left, handleProps: { onPointerDown, onPointerMove, onKeyDown, onDoubleClick: reset } }
}
