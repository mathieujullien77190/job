export type CvStatus = 'unknown' | 'base' | 'modified'

// Le CV de la candidature est comparé au CV de base lors du chargement (withAssets) : cvModified false = identique au CV de base.
export const cvStatusOf = (cvModified?: boolean): CvStatus =>
  cvModified === undefined ? 'unknown' : cvModified ? 'modified' : 'base'
