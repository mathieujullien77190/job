import type { Application, Status, Todo } from '@/types'
import { DAY_MS, FOLLOW_UP_DAYS, NOTE_COLORS } from './constants'
import type { Reminder } from './types'

export const daysSince = (date: string, now: number): number => Math.floor((now - Date.parse(date)) / DAY_MS)

const WAITING: Status[] = ['envoyée', 'reçue']

export const countWaiting = (items: Application[]): number => items.filter((a) => WAITING.includes(a.status)).length

// Rappels déduits des candidatures : CV / lettre pas vérifiés (statut étude), candidature sans nouvelle depuis une semaine.
export const buildReminders = (items: Application[], now: number): Reminder[] =>
  items.flatMap((a): Reminder[] => {
    if (a.status === 'étude') {
      const missing = [!a.checks?.cv && 'CV', !a.checks?.letter && 'lettre'].filter(Boolean)
      return missing.length ? [{ id: `${a.id}-check`, company: a.company, text: `Vérifier : ${missing.join(' + ')}` }] : []
    }
    if (WAITING.includes(a.status)) {
      const days = daysSince(a.date, now)
      return days >= FOLLOW_UP_DAYS
        ? [{ id: `${a.id}-follow`, company: a.company, text: `Relancer (${days} jours sans nouvelle)` }]
        : []
    }
    return []
  })

export const newTodo = (text: string, count: number): Todo => ({
  id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
  text: text.trim(),
  done: false,
  color: count % NOTE_COLORS.length,
})

// Les post-its non faits en premier ; l'ordre d'ajout est conservé dans chaque groupe.
export const sortTodos = (todos: Todo[]): Todo[] => [...todos.filter((t) => !t.done), ...todos.filter((t) => t.done)]
