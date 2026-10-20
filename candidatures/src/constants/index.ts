import type { Level, Status } from '@/types'

// Largeur de la colonne de gauche (liste), en % de la fenêtre, quand on redimensionne les deux volets.
export const SPLIT_DEFAULT = 50
export const SPLIT_MIN = 25
export const SPLIT_MAX = 75
export const SPLIT_KEY_STEP = 2

export const STATUSES: Status[] = ['étude', 'envoyée', 'reçue', 'relancée', 'entretien', 'refusée', 'acceptée']

export const STATUS_COLORS: Record<Status, string> = {
  étude: '#14b8a6',
  envoyée: '#3b82f6',
  reçue: '#06b6d4',
  relancée: '#f59e0b',
  entretien: '#8b5cf6',
  refusée: '#ef4444',
  acceptée: '#22c55e',
}

export const LEVEL_COLORS: Record<Level, string> = {
  acquis: '#22c55e',
  partiel: '#f59e0b',
  'à préparer': '#ef4444',
}

export const MAX_MATCH_LINES = 3
