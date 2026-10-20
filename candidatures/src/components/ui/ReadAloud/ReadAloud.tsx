import { useState } from 'react'
import { DEFAULT_RATE, NATURAL_HINT, PAUSE_LABEL, RATES, RATE_LABEL, READ_LABEL, RESUME_LABEL, STOP_LABEL } from './constants'
import { isNatural } from './helpers'
import { Button, Rate, Wrap } from './styles'
import type { ReadAloudProps } from './types'
import { useSpeech } from './useSpeech'

// Bouton « Lire » : lit le texte à voix haute avec la voix française la plus naturelle du navigateur (idéalement Edge, voix « Natural »).
// Pendant la lecture : Pause (reprise au début de la phrase) et Arrêter.
const ReadAloud = ({ text, label = READ_LABEL, showRate = false }: ReadAloudProps) => {
  const { supported, state, voice, speak, pause, resume, stop } = useSpeech()
  const [rate, setRate] = useState(DEFAULT_RATE)
  if (!supported) return null

  const title = voice ? `Voix : ${voice.name}${isNatural(voice) ? '' : ` — ${NATURAL_HINT}`}` : NATURAL_HINT
  const idle = state === 'idle'

  return (
    <Wrap>
      {idle ? (
        <Button type="button" $on={false} title={title} onClick={() => speak(text, rate)}>
          {label}
        </Button>
      ) : (
        <>
          <Button type="button" $on title={title} onClick={state === 'speaking' ? pause : resume}>
            {state === 'speaking' ? PAUSE_LABEL : RESUME_LABEL}
          </Button>
          <Button type="button" $on={false} onClick={stop}>
            {STOP_LABEL}
          </Button>
        </>
      )}
      {showRate && (
        <Rate value={rate} aria-label={RATE_LABEL} title={RATE_LABEL} onChange={(e) => setRate(Number(e.target.value))}>
          {RATES.map((r) => (
            <option key={r} value={r}>
              {r}×
            </option>
          ))}
        </Rate>
      )}
    </Wrap>
  )
}

export default ReadAloud
