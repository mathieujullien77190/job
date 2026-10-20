import { useMemo, useState } from 'react'
import MarkdownView from '@/components/MarkdownView'
import ReadAloud from '@/components/ui/ReadAloud'
import Tabs from '@/components/ui/Tabs'
import { useKnowledge } from '@/components/KnowledgeProvider'
import { BACK_LABEL, EMPTY_LABEL, HINT, READ_HEIGHT, TITLE } from './constants'
import { parseSections } from './helpers'
import { Back, Heading, Hint, Section } from './styles'
import type { InterviewPrepProps } from './types'

// Préparation à l'entretien : les notes d'entretien (Firestore, meta/interview), une section par onglet (pitch, parcours, personnalité, réalisations, salaire, anglais, glossaire).
export const InterviewPrep = ({ onBack }: InterviewPrepProps) => {
  const { interview } = useKnowledge()
  const sections = useMemo(() => parseSections(interview), [interview])
  const [chosen, setActive] = useState('')
  const active = chosen || (sections[0]?.id ?? '')
  const current = sections.find((s) => s.id === active)

  return (
    <Section>
      <Back type="button" onClick={onBack}>{BACK_LABEL}</Back>
      <Heading>{TITLE}</Heading>
      <Hint>{HINT}</Hint>
      {sections.length === 0 && <Hint>{EMPTY_LABEL}</Hint>}
      {sections.length > 0 && (
        <>
          <Tabs tabs={sections.map((s) => ({ id: s.id, label: s.title }))} active={active} onSelect={setActive} />
          {current && <ReadAloud showRate label="🔊 Lire cette section" text={`# ${current.title}
${current.body}`} />}
          {current && <MarkdownView source={current.body} maxHeight={READ_HEIGHT} />}
        </>
      )}
    </Section>
  )
}
