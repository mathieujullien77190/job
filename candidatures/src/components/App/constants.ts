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
  'Impossible de lire les fichiers de envois/. Lance le site avec « pnpm run dev » : le serveur de dev lit et écrit les fichiers.'
export const SAVE_ERROR_LABEL = 'Modification non enregistrée'
// Pause après la dernière frappe avant d'écrire le texte dans le fichier
export const SAVE_DELAY_MS = 600
export const SORT_DESC_LABEL = 'Date : récentes d’abord ↓'
export const SORT_ASC_LABEL = 'Date : anciennes d’abord ↑'
export const RESIZE_LABEL = 'Redimensionner la liste et le PDF (glisser, flèches gauche/droite, double-clic pour réinitialiser)'
export const FILTER_HINT = 'Clique sur un statut pour filtrer, une 2e fois pour tout afficher.'
