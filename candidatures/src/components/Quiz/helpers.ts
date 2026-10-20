import { AVERAGE_PERCENT, GOOD_PERCENT } from './constants'

export const percent = (right: number, total: number): number => (total === 0 ? 0 : Math.round((right / total) * 100))

export const verdict = (right: number, total: number): string => {
  const p = percent(right, total)
  if (p >= GOOD_PERCENT) return 'Très bien : le sujet est solide.'
  if (p >= AVERAGE_PERCENT) return 'Correct : relis les points ratés avant de passer à la suite.'
  return 'À retravailler : relis la fiche puis refais le QCM.'
}
