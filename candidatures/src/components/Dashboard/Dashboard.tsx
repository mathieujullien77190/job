import { useMemo, useState } from 'react'
import { STATUSES, STATUS_COLORS } from '@/constants'
import { useKnowledge } from '@/components/KnowledgeProvider'
import { sortByDate } from '@/components/App/helpers'
import {
  NOTE_COLORS,
  RECENT_COUNT,
  RECENT_TITLE,
  SITES_EMPTY_LABEL,
  SITES_TITLE,
  REMINDERS_EMPTY_LABEL,
  REMINDERS_TITLE,
  STATUS_TITLE,
  TITLE,
  TODO_ADD_LABEL,
  TODO_COLOR_LABEL,
  TODO_DELETE_LABEL,
  TODO_DONE_LABEL,
  TODO_EMPTY_LABEL,
  TODO_ERROR_LABEL,
  TODO_LOAD_ERROR_LABEL,
  TODO_PLACEHOLDER,
  TODO_TITLE,
} from './constants'
import { buildReminders, countWaiting, newTodo, sortTodos } from './helpers'
import {
  AddButton,
  AddForm,
  Bar,
  BarPart,
  Block,
  BlockTitle,
  Columns,
  Dot,
  Figure,
  Figures,
  Heading,
  Hint,
  Legend,
  SiteLink,
  Sites,
  Note,
  NoteButton,
  NoteText,
  Notice,
  Row,
  Rows,
  Section,
  Stack,
} from './styles'
import type { DashboardProps } from './types'
import { useTodos } from './useTodos'

// Tableau de bord : chiffres clés, post-its à faire (Firestore, meta/todos), rappels déduits des candidatures, répartition par statut.
export const Dashboard = ({ items }: DashboardProps) => {
  const { sites: SEARCH_SITES } = useKnowledge()
  const { todos, load, saveError, add, patch, remove } = useTodos()
  const [draft, setDraft] = useState('')
  const now = useMemo(() => Date.now(), [])
  const reminders = useMemo(() => buildReminders(items, now), [items, now])
  const recent = useMemo(() => sortByDate(items, 'desc').slice(0, RECENT_COUNT), [items])
  const notes = useMemo(() => sortTodos(todos), [todos])
  const figures = [
    { label: 'Candidatures', value: items.length },
    { label: 'En attente de réponse', value: countWaiting(items) },
    { label: 'Entretiens', value: items.filter((a) => a.status === 'entretien').length },
    { label: 'Post-its restants', value: todos.filter((t) => !t.done).length },
  ]

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!draft.trim()) return
    add(newTodo(draft, todos.length))
    setDraft('')
  }

  return (
    <Section>
      <Heading>{TITLE}</Heading>
      <Figures>
        {figures.map((f) => (
          <Figure key={f.label}>
            <strong>{f.value}</strong>
            <span>{f.label}</span>
          </Figure>
        ))}
      </Figures>

      <Block>
        <BlockTitle>{TODO_TITLE}</BlockTitle>
        {load === 'error' && <Notice role="alert">{TODO_LOAD_ERROR_LABEL}</Notice>}
        {saveError && <Notice role="alert">{TODO_ERROR_LABEL} : {saveError}</Notice>}
        <AddForm onSubmit={submit}>
          <input
            type="text"
            value={draft}
            placeholder={TODO_PLACEHOLDER}
            aria-label={TODO_PLACEHOLDER}
            onChange={(e) => setDraft(e.target.value)}
          />
          <AddButton type="submit" disabled={!draft.trim()}>
            {TODO_ADD_LABEL}
          </AddButton>
        </AddForm>
        {load === 'ready' && notes.length === 0 && <Hint>{TODO_EMPTY_LABEL}</Hint>}
        <Stack>
          {notes.map((t) => (
            <Note
              key={t.id}
              $color={NOTE_COLORS[t.color % NOTE_COLORS.length]}
              $done={t.done}
            >
              <input
                type="checkbox"
                checked={t.done}
                aria-label={`${TODO_DONE_LABEL} : ${t.text}`}
                onChange={(e) => patch(t.id, { done: e.target.checked })}
              />
              <NoteText $done={t.done}>{t.text}</NoteText>
              <NoteButton
                type="button"
                title={TODO_COLOR_LABEL}
                aria-label={TODO_COLOR_LABEL}
                onClick={() => patch(t.id, { color: (t.color + 1) % NOTE_COLORS.length })}
              >
                ◐
              </NoteButton>
              <NoteButton type="button" title={TODO_DELETE_LABEL} aria-label={TODO_DELETE_LABEL} onClick={() => remove(t.id)}>
                ✕
              </NoteButton>
            </Note>
          ))}
        </Stack>
      </Block>

      <Columns>
        <Block>
          <BlockTitle>{REMINDERS_TITLE}</BlockTitle>
          {reminders.length === 0 ? (
            <Hint>{REMINDERS_EMPTY_LABEL}</Hint>
          ) : (
            <Rows>
              {reminders.map((r) => (
                <Row key={r.id}>
                  <strong>{r.company}</strong>
                  <span>{r.text}</span>
                </Row>
              ))}
            </Rows>
          )}
        </Block>

        <Block>
          <BlockTitle>{STATUS_TITLE}</BlockTitle>
          <Bar>
            {STATUSES.map((s) => {
              const count = items.filter((a) => a.status === s).length
              return count ? <BarPart key={s} $color={STATUS_COLORS[s]} $share={(count / items.length) * 100} title={`${s} : ${count}`} /> : null
            })}
          </Bar>
          <Legend>
            {STATUSES.map((s) => (
              <li key={s}>
                <Dot $color={STATUS_COLORS[s]} />
                {s} : {items.filter((a) => a.status === s).length}
              </li>
            ))}
          </Legend>
        </Block>

        <Block>
          <BlockTitle>{SITES_TITLE}</BlockTitle>
          {SEARCH_SITES.length === 0 ? (
            <Hint>{SITES_EMPTY_LABEL}</Hint>
          ) : (
            <Sites>
              {SEARCH_SITES.map((s) => (
                <li key={s.url}>
                  <SiteLink href={s.url} target="_blank" rel="noreferrer noopener">
                    {s.label} ↗
                  </SiteLink>
                </li>
              ))}
            </Sites>
          )}
        </Block>

        <Block>
          <BlockTitle>{RECENT_TITLE}</BlockTitle>
          <Rows>
            {recent.map((a) => (
              <Row key={a.id}>
                <strong>{a.company}</strong>
                <span>
                  {a.status} · {a.date}
                </span>
              </Row>
            ))}
          </Rows>
        </Block>
      </Columns>
    </Section>
  )
}
