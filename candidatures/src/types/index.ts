export type Status = 'étude' | 'envoyée' | 'reçue' | 'relancée' | 'entretien' | 'refusée' | 'acceptée'

export type Level = 'acquis' | 'partiel' | 'à préparer'

export type Keyword = {
  id: string
  label: string
  category: string
  level: Level
  summary: string
  terms: string[] // mots à retrouver (et surligner) dans le texte de l'offre
  pdfUrl: string
}

// Fiche de la base de connaissance (Firestore kb/<id>) : un mot-clé + le texte brut pour la recherche.
export type KnowledgeEntry = Keyword & { text: string; speech?: string } // speech : texte à lire à voix haute (titres et paragraphes, sans tableaux ni code)

// Vue affichée par le menu du haut.
export type View = 'applications' | 'knowledge' | 'dashboard'

export type Detail = { label: string; value: string }

// « CV vérifié » et « Lettre de motivation vérifiée »
export type Checks = { cv: boolean; letter: boolean }

// Proposition de lettre (applications/<id>.proposals), choisie dans l'onglet Lettre (statut étude).
export type LetterProposal = { id: string; label: string; text: string }

// Une candidature telle qu'elle est stockée dans Firestore (applications/<id>).
export type ServerApplication = {
  id: string // identifiant du document (slug : nom d'entreprise en minuscules)
  company: string
  title: string
  location?: string
  date: string // YYYY-MM-DD
  addedAt?: number // date de création du dossier (ms) : départage les candidatures d'un même jour
  url?: string
  status: Status
  checks?: Checks // cases cochées dans la carte, enregistrées dans candidature.json
  details?: Detail[] // détails du poste (contrat, salaire, télétravail…), saisis dans candidature.json
  message?: string // lettre de motivation (lettre_motivation.txt)
  cvChanges?: string // modifications à apporter au CV (modifs_cv.md, en Markdown)
  summary?: string // petit résumé de l'offre (resume.md, en Markdown)
  questions?: string // historique des questions posées sur l'offre (questions.md, en Markdown)
  offer?: string // texte de l'annonce (offre.txt)
  proposals: LetterProposal[]
  keywords?: KeywordData[] // mots-clés de l'offre (fiches de la base de connaissance)
}

// Mot-clé tel qu'il est stocké dans Firestore : la fiche (HTML) est retrouvée par son id dans la base de connaissance.
export type KeywordData = Omit<Keyword, 'pdfUrl'>

// Contenu ajouté côté client : CV (HTML en texte dans Firestore, affiché depuis une URL blob) et fiches liées aux mots-clés.
export type Application = Omit<ServerApplication, 'keywords'> & {
  cvUrl?: string // CV à envoyer (HTML propre)
  cvPreviewUrl?: string // aperçu du CV modifié, modifications en couleur
  cvModified?: boolean // false : identique au CV de base
  keywords: Keyword[]
}

// Ce qui est modifiable dans la page : écrit dans Firestore (applications/<id>).
export type Editable = Pick<Application, 'status' | 'message' | 'cvChanges' | 'checks'>

export type SortOrder = 'desc' | 'asc'

export type PdfDocument = { title: string; url: string }

// PDF(s) affichés dans le panneau de droite : plusieurs documents = onglets (ex. CV à envoyer + aperçu modifié).
export type PdfSelection = { heading: string; docs: PdfDocument[]; active: number }

export type TextSegment = { text: string; hit: boolean }

// Post-it de la liste de choses à faire du tableau de bord (Firestore, meta/todos).
export type Todo = { id: string; text: string; done: boolean; color: number }

// Site de recherche d'emploi (Firestore, meta/sites), affiché dans le tableau de bord.
export type SearchSite = { label: string; url: string }

// QCM d'une fiche de la base de connaissance (Firestore qcm/<id>) : une seule bonne réponse, answer = index dans choices.
export type QcmQuestion = { q: string; choices: string[]; answer: number; explain: string }
export type QcmFile = { id: string; questions: QcmQuestion[] }

// Question à réponse longue d'une fiche (Firestore openQuestions/<id>) ; keyPoints = grille de correction, jamais affichée avant la correction.
export type OpenQuestion = { id: string; q: string; keyPoints: string[] }
export type OpenQuestionFile = { id: string; questions: OpenQuestion[] }

// Correction écrite par Claude Code (skill valider-reponses) dans Firestore (answers/<fiche>).
export type AnswerReview = { status: 'correct' | 'partiel' | 'incorrect'; feedback: string; improved?: string; reviewedAt: string }
// Réponse longue de l'utilisateur : texte écrit dans la page, correction ajoutée ensuite par Claude.
export type Answer = { text: string; savedAt: string; review?: AnswerReview }
export type AnswersByFiche = Record<string, Record<string, Answer>>
