import type { QuizQuestion } from '@/components/Quiz/types'
import type { KnowledgeEntry, QcmQuestion } from '@/types'

// Comparaison sans accents ni casse : « securite » trouve « Sécurité ».
const normalize = (s: string): string =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

// Chaque mot de la recherche doit apparaître quelque part (titre, catégorie, résumé, termes ou texte de la fiche).
export const matches = (entry: KnowledgeEntry, query: string): boolean => {
  const words = normalize(query).split(/\s+/).filter(Boolean)
  if (!words.length) return true
  const haystack = normalize([entry.label, entry.category, entry.summary, entry.terms.join(' '), entry.text].join(' '))
  return words.every((w) => haystack.includes(w))
}

// Groupes par catégorie, dans l'ordre d'apparition des fiches.
export const groupByCategory = (entries: KnowledgeEntry[]): [string, KnowledgeEntry[]][] => {
  const groups = new Map<string, KnowledgeEntry[]>()
  for (const e of entries) groups.set(e.category, [...(groups.get(e.category) ?? []), e])
  return [...groups.entries()]
}

// Mélange de Fisher-Yates (copie : le tableau d'origine n'est pas modifié).
export const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

// Question prête à poser : les choix sont mélangés et l'index de la bonne réponse suit le mélange.
export const toQuizQuestion = (source: string, question: QcmQuestion): QuizQuestion => {
  const order = shuffle(question.choices.map((_, i) => i))
  return {
    source,
    q: question.q,
    choices: order.map((i) => question.choices[i]),
    answer: order.indexOf(question.answer),
    explain: question.explain,
  }
}

export const ficheQuiz = (entry: KnowledgeEntry, questions: QcmQuestion[]): QuizQuestion[] =>
  shuffle(questions).map((q) => toQuizQuestion(entry.label, q))

// QCM général : count questions tirées au hasard dans toutes les fiches.
export const generalQuiz = (entries: KnowledgeEntry[], bank: Record<string, QcmQuestion[]>, count: number): QuizQuestion[] =>
  shuffle(entries.flatMap((e) => (bank[e.id] ?? []).map((q) => toQuizQuestion(e.label, q))))
    .slice(0, count)
