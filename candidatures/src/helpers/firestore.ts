import { initializeApp } from 'firebase/app'
import { collection, doc, getDocs, initializeFirestore, limit, query } from 'firebase/firestore'
import config from './firebase-config.json'

// Config web Firebase : publique par conception (elle ne donne accès à rien sans le secret).
// Toutes les données vivent sous vault/<secret>/… ; le secret est comparé dans firestore.rules (modèle :
// outils/firebase/firestore.rules.template, le vrai secret n'est jamais dans git). Il est lu dans l'adresse de la page (SecretGate).
const app = initializeApp(config)
export const db = initializeFirestore(app, { ignoreUndefinedProperties: true })

// Le secret vient de l'adresse (?key=…, voir SecretGate) et n'est conservé qu'en mémoire.
let secret = ''

export const setSecret = (value: string): void => {
  secret = value
}

export const vaultCollection = (name: string) => collection(db, 'vault', secret, name)
export const vaultDoc = (name: string, id: string) => doc(db, 'vault', secret, name, id)

// Vrai si le secret est accepté par les règles (lecture autorisée), faux s'il est refusé.
export const checkSecret = async (value: string): Promise<boolean> => {
  try {
    await getDocs(query(collection(db, 'vault', value, 'applications'), limit(1)))
    return true
  } catch (error) {
    if ((error as { code?: string }).code === 'permission-denied') return false
    throw error
  }
}
