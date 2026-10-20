import type { TabItem } from '@/components/ui/Tabs/types'
import type { Application, PdfDocument } from '@/types'
import {
  CV_BASE_SEND_TAB,
  CV_BASE_TAB,
  CV_LABEL,
  CV_PREVIEW_TAB,
  CV_SEND_TAB,
  DETAILS_LABEL,
  KEYWORDS_LABEL,
  LETTER_LABEL,
  OFFER_LABEL,
  QUESTIONS_LABEL,
  SUMMARY_LABEL,
  TAB_CV,
  TAB_DETAILS,
  TAB_KEYWORDS,
  TAB_LETTER,
  TAB_OFFER,
  TAB_QUESTIONS,
  TAB_SUMMARY,
} from './constants'
import type { CvStatus } from './useCvStatus'

export const noop = (): void => {}

export const formatDate = (date: string): string => new Date(date).toLocaleDateString('fr-FR')

// Onglets du panneau de droite : CV de base, CV à envoyer, aperçu modifié.
// Si le CV à envoyer est identique au CV de base, un seul onglet (pas de doublon).
export const cvDocuments = (item: Application, status: CvStatus, baseCvUrl?: string): PdfDocument[] => [
  ...(baseCvUrl ? [{ title: status === 'base' ? CV_BASE_SEND_TAB : CV_BASE_TAB, url: baseCvUrl }] : []),
  ...(item.cvUrl && (status !== 'base' || !baseCvUrl) ? [{ title: CV_SEND_TAB, url: item.cvUrl }] : []),
  ...(item.cvPreviewUrl ? [{ title: CV_PREVIEW_TAB, url: item.cvPreviewUrl }] : []),
]

// Onglets de la carte : résumé, détails, modifs du CV, lettre, mots-clés, texte brut de l'offre, questions. Un onglet sans contenu n'existe pas (sauf en étude, où on peut écrire).
export const cardTabs = (item: Application, editable: boolean): TabItem[] =>
  [
    item.summary ? { id: TAB_SUMMARY, label: SUMMARY_LABEL } : null,
    item.details?.length ? { id: TAB_DETAILS, label: DETAILS_LABEL } : null,
    item.cvChanges || editable ? { id: TAB_CV, label: CV_LABEL } : null,
    item.message || editable ? { id: TAB_LETTER, label: LETTER_LABEL } : null,
    item.keywords.length ? { id: TAB_KEYWORDS, label: `${KEYWORDS_LABEL} (${item.keywords.length})` } : null,
    item.offer ? { id: TAB_OFFER, label: OFFER_LABEL } : null,
    item.questions ? { id: TAB_QUESTIONS, label: QUESTIONS_LABEL } : null,
  ].filter((t): t is TabItem => t !== null)
