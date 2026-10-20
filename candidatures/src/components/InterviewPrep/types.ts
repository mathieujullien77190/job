export type InterviewPrepProps = {
  onBack: () => void
}

// Une section du fichier base/entretien.md : un titre « ## » et son contenu Markdown.
export type PrepSection = { id: string; title: string; body: string }
