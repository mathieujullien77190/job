export type InterviewPrepProps = {
  onBack: () => void
}

// Une section des notes d'entretien (Firestore, meta/interview) : un titre « ## » et son contenu Markdown.
export type PrepSection = { id: string; title: string; body: string }
