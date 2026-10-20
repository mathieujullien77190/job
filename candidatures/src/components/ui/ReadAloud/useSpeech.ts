import { useCallback, useEffect, useRef, useState } from 'react'
import { bestFrenchVoice, speechChunks } from './helpers'
import type { SpeechChunk } from './helpers'
import type { SpeechState } from './types'

const supported = (): boolean => typeof window !== 'undefined' && 'speechSynthesis' in window

// Lecture à voix haute par la synthèse vocale du navigateur (Web Speech API) : voix française la plus naturelle disponible.
// La pause annule l'énoncé en cours et reprend au début de la phrase interrompue : cela marche aussi avec les voix en ligne (Edge « Natural »), qui ignorent parfois pause()/resume().
export const useSpeech = () => {
  const [state, setState] = useState<SpeechState>('idle')
  const [voice, setVoice] = useState<SpeechSynthesisVoice | undefined>()
  const run = useRef(0) // identifie la lecture en cours : une lecture annulée ne relance pas la suivante
  const chunks = useRef<SpeechChunk[]>([])
  const index = useRef(0) // phrase en cours de lecture
  const rate = useRef(1)
  const offset = useRef(0) // caractère atteint dans la phrase en cours (si la voix envoie des événements de mot)

  useEffect(() => {
    if (!supported()) return
    const update = () => setVoice(bestFrenchVoice(window.speechSynthesis.getVoices()))
    update()
    window.speechSynthesis.addEventListener('voiceschanged', update)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', update)
  }, [])

  const play = useCallback(
    (from: number, startAt = 0) => {
      const id = ++run.current
      if (supported()) window.speechSynthesis.cancel()
      setState('speaking')
      const next = (i: number, skip = 0) => {
        if (run.current !== id) return
        index.current = i
        offset.current = skip
        if (i >= chunks.current.length) {
          setState('idle')
          return
        }
        const u = new SpeechSynthesisUtterance(chunks.current[i].text.slice(skip))
        u.lang = voice?.lang ?? 'fr-FR'
        if (voice) u.voice = voice
        u.rate = rate.current
        // Les voix qui envoient les mots lus (souvent les voix locales) permettent de reprendre au mot près.
        u.onboundary = (e) => {
          if (run.current === id) offset.current = skip + e.charIndex
        }
        // Après un titre, on laisse un silence avant la suite ; la reprise après pause repartira alors de la suite.
        u.onend = () => {
          const gap = chunks.current[i].pause
          if (gap > 0) {
            index.current = i + 1
            offset.current = 0
            window.setTimeout(() => next(i + 1), gap)
          } else next(i + 1)
        }
        u.onerror = () => {
          if (run.current === id) setState('idle')
        }
        window.speechSynthesis.speak(u)
      }
      next(from, startAt)
    },
    [voice],
  )

  const speak = useCallback(
    (text: string, newRate: number) => {
      if (!supported()) return
      chunks.current = speechChunks(text)
      if (!chunks.current.length) return
      rate.current = newRate
      play(0)
    },
    [play],
  )

  const pause = useCallback(() => {
    run.current += 1
    if (supported()) window.speechSynthesis.cancel()
    setState('paused')
  }, [])

  // Reprise au mot près si la voix le permet, sinon au début de la phrase interrompue.
  const resume = useCallback(() => {
    const text = chunks.current[index.current]?.text ?? ''
    const wordStart = text.lastIndexOf(' ', offset.current) + 1
    play(index.current, offset.current > 0 ? wordStart : 0)
  }, [play])

  const stop = useCallback(() => {
    run.current += 1
    if (supported()) window.speechSynthesis.cancel()
    index.current = 0
    offset.current = 0
    setState('idle')
  }, [])

  // On arrête la lecture quand le composant disparaît (changement de question, de page…).
  useEffect(() => stop, [stop])

  return { supported: supported(), state, voice, speak, pause, resume, stop }
}
