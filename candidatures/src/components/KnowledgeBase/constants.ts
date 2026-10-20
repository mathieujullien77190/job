export const TITLE = 'Base de connaissance'
export const SEARCH_PLACEHOLDER = 'Rechercher une techno, un mot, une notion…'
export const EMPTY_LABEL = 'Aucune fiche ne correspond.'
export const COUNT_LABEL = (shown: number, total: number): string =>
  shown === total ? `${total}` : `${shown} / ${total}`
export const GENERAL_TITLE = 'QCM général'
export const GENERAL_HINT = 'Questions tirées au hasard dans toutes les fiches. Chaque fiche a aussi son QCM et ses questions ouvertes (boutons sous la fiche).'
export const GENERAL_COUNTS = [10, 20, 30, 50]
export const GENERAL_DEFAULT_COUNT = 20
export const GENERAL_COUNT_LABEL = 'Nombre de questions'
export const GENERAL_START_LABEL = 'Lancer le QCM général'
export const GENERAL_SOURCE_LABEL = 'QCM général'
export const PREP_TITLE = 'Préparation à l\'entretien'
export const PREP_HINT = 'Pitch de 3 minutes, questions sur le parcours et la personnalité, réalisations, salaire, anglais et glossaire des technos.'
export const PREP_OPEN_LABEL = 'Ouvrir la préparation'
