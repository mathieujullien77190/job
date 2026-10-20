import { SPLIT_MAX, SPLIT_MIN } from '@/constants'
import type { Application, SortOrder, Status } from '@/types'

export const clampSplit = (percent: number): number => Math.min(SPLIT_MAX, Math.max(SPLIT_MIN, Math.round(percent * 10) / 10))

export const filterByStatus = (items: Application[], status: Status | null): Application[] =>
  status ? items.filter((a) => a.status === status) : items

// Tri par date de candidature ; à date égale, la dernière ajoutée (dossier le plus récent) passe en premier en ordre « récentes d'abord ».
export const sortByDate = (items: Application[], order: SortOrder): Application[] => {
  const direction = order === 'desc' ? 1 : -1
  return [...items].sort(
    (a, b) => direction * (b.date.localeCompare(a.date) || (b.addedAt ?? 0) - (a.addedAt ?? 0)),
  )
}

export const countByStatus = (items: Application[], status: Status): number =>
  items.filter((a) => a.status === status).length
