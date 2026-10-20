// Question prête à être posée : les choix sont déjà mélangés, answer = index de la bonne réponse dans choices.
export type QuizQuestion = {
  source: string // fiche d'où vient la question
  q: string
  choices: string[]
  answer: number
  explain: string
}

export type QuizProps = {
  title: string
  questions: QuizQuestion[]
  onReplay: () => void // nouvelle série (autre ordre ou autres questions)
  onExit: () => void
}
