import type { MenuItem } from '@/components/ui/Menu/types'
export const TITLE = 'Mes candidatures'
export const EMPTY_LABEL = 'Aucune candidature.'
export const MENU_ITEMS: MenuItem[] = [
  { id: 'dashboard', label: 'Tableau de bord' },
  { id: 'applications', label: 'Candidatures' },
  { id: 'knowledge', label: 'Base de connaissance' },
]
export const LOADING_LABEL = 'Chargement des candidatures…'
export const API_ERROR_LABEL =
  'Impossible de lire les candidatures dans Firestore. Vérifie la connexion puis recharge la page.'
export const SAVE_ERROR_LABEL = 'Modification non enregistrée'
// Pause après la dernière frappe avant d'enregistrer le texte dans Firestore
export const SAVE_DELAY_MS = 600
export const SORT_DESC_LABEL = 'Date : récentes d’abord ↓'
export const SORT_ASC_LABEL = 'Date : anciennes d’abord ↑'
export const RESIZE_LABEL = 'Redimensionner la liste et le PDF (glisser, flèches gauche/droite, double-clic pour réinitialiser)'
export const FILTER_HINT = 'Clique sur un statut pour filtrer, une 2e fois pour tout afficher.'
