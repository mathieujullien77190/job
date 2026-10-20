import { useEffect, useState, type ReactNode } from 'react'
import { checkSecret, setSecret } from '@/helpers/firestore'
import { CHECKING_LABEL, DENIED_LABEL, ERROR_LABEL, MISSING_LABEL } from './constants'
import { Message, Page } from './styles'

type State = 'checking' | 'open' | 'missing' | 'denied' | 'error'

// Le secret vient de l'adresse (https://…/?key=<secret>) et y reste. Pas de page de connexion :
// sans secret, ou avec un mauvais secret, la page affiche seulement une erreur.
const secretFromUrl = (): string => (new URLSearchParams(window.location.search).get('key') ?? '').trim()

const ERRORS: Record<Exclude<State, 'checking' | 'open'>, string> = {
  missing: MISSING_LABEL,
  denied: DENIED_LABEL,
  error: ERROR_LABEL,
}

const SecretGate = ({ children }: { children: ReactNode }) => {
  const [secret] = useState(secretFromUrl)
  const [state, setState] = useState<State>(secret ? 'checking' : 'missing')

  useEffect(() => {
    if (!secret) return
    let cancelled = false
    checkSecret(secret).then(
      (ok) => {
        if (cancelled) return
        if (ok) setSecret(secret)
        setState(ok ? 'open' : 'denied')
      },
      () => !cancelled && setState('error'),
    )
    return () => {
      cancelled = true
    }
  }, [secret])

  if (state === 'open') return <>{children}</>
  return (
    <Page>
      <Message role={state === 'checking' ? 'status' : 'alert'}>{state === 'checking' ? CHECKING_LABEL : ERRORS[state]}</Message>
    </Page>
  )
}

export default SecretGate
