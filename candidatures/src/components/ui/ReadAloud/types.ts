export type ReadAloudProps = {
  text: string // texte à lire (Markdown accepté : la mise en forme est retirée)
  label?: string // libellé du bouton (« 🔊 Lire » par défaut)
  showRate?: boolean // affiche le choix de vitesse
}

export type SpeechState = 'idle' | 'speaking' | 'paused'
