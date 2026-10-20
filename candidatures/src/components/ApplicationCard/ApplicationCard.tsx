import { useEffect, useState } from 'react'
import JobDetails from '@/components/JobDetails'
import KeywordList from '@/components/KeywordList'
import { useKnowledge } from '@/components/KnowledgeProvider'
import { htmlUrl } from '@/helpers/htmlUrl'
import MarkdownView from '@/components/MarkdownView'
import LinkButton from '@/components/ui/LinkButton'
import TextSection from '@/components/TextSection'
import Tabs from '@/components/ui/Tabs'
import { STATUSES, STATUS_COLORS } from '@/constants'
import type { Status } from '@/types'
import {
  CV_BASE_LABEL,
  CV_CHANGES_TITLE,
  COLLAPSE_LABEL,
  CV_CHECK_LABEL,
  CV_EDIT_LABEL,
  CV_MODIFIED_LABEL,
  CV_VIEW_LABEL,
  EXPAND_LABEL,
  LETTER_CHECK_LABEL,
  LETTER_TITLE,
  EMPTY_PROPOSAL_HINT,
  OFFER_LABEL,
  FEEDBACK_MS,
  PROPOSALS_LABEL,
  SAVED_LABEL,
  SAVE_FAILED_LABEL,
  SAVE_MIXTE_LABEL,
  TAB_CV,
  TAB_DETAILS,
  TAB_KEYWORDS,
  TAB_LETTER,
  TAB_OFFER,
  TAB_QUESTIONS,
  TAB_SUMMARY,
} from './constants'
import { cardTabs, cvDocuments, formatDate, noop } from './helpers'
import {
  Card,
  CheckLabel,
  ChecksRow,
  Choice,
  Choices,
  ChoicesLabel,
  Company,
  CvBadge,
  Header,
  Meta,
  ModeBar,
  SaveButton,
  SaveFeedback,
  SaveRow,
  StatusSelect,
  TabContent,
  Title,
  Titles,
  Toggle,
} from './styles'
import type { ApplicationCardProps } from './types'
import { cvStatusOf } from './useCvStatus'

export const ApplicationCard = ({
  item,
  selected,
  onSelect,
  onStatus,
  onMessage,
  onCvChanges,
  onChecks,
  onSaveMixte,
  onOpenPdf,
  onQcm,
}: ApplicationCardProps) => {
  const editable = item.status === 'étude'
  const { baseCv } = useKnowledge()
  const baseCvUrl = baseCv ? htmlUrl(baseCv) : undefined
  const cvStatus = cvStatusOf(item.cvModified)
  const cvDocs = cvDocuments(item, cvStatus, baseCvUrl)
  const cvHeading = `CV — ${item.company}`
  const tabs = cardTabs(item, editable)
  const checks = { cv: item.checks?.cv ?? false, letter: item.checks?.letter ?? false }
  // Déplié / réduit : propre à chaque candidature, choisir une autre candidature n'en referme aucune.
  // Au départ, seule la candidature sélectionnée est dépliée.
  const [expanded, setExpanded] = useState(selected)
  const collapsed = !expanded

  // Sélectionner une candidature affiche ses CV (de base, à envoyer, aperçu) dans le panneau de droite.
  // On attend que la comparaison avec le CV de base soit faite pour ne pas afficher un doublon.
  const cvReady = !item.cvUrl || cvStatus !== 'unknown'
  useEffect(() => {
    if (selected && cvReady && cvDocs.length) onOpenPdf({ heading: cvHeading, docs: cvDocs, active: 0 })
    // uniquement à la sélection (ou quand la comparaison se termine), pas à chaque rendu
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, cvReady, cvStatus])
  // « Détails du poste » est présélectionné quand il existe ; recliquer l'onglet actif le ferme
  const [tab, setTab] = useState<string | null>(item.details?.length ? TAB_DETAILS : null)
  const [cvEditing, setCvEditing] = useState(false) // false : Markdown mis en forme ; true : texte brut modifiable

  // Bouton « Enregistrer dans 0. Mixte » : copie la lettre actuelle dans propositions_lettre/0-Mixte.txt
  const [mixteState, setMixteState] = useState<'idle' | 'saved' | 'error'>('idle')
  const saveMixte = async () => {
    try {
      await onSaveMixte(item.message ?? '')
      setMixteState('saved')
    } catch {
      setMixteState('error')
    }
    window.setTimeout(() => setMixteState('idle'), FEEDBACK_MS)
  }

  // Ouvrir « Modifications du CV » affiche aussi les PDF du CV (à envoyer + aperçu modifié) dans le panneau de droite.
  const selectTab = (id: string) => {
    setTab((current) => (current === id ? null : id))
    if (id === TAB_CV && tab !== TAB_CV && cvDocs.length) onOpenPdf({ heading: cvHeading, docs: cvDocs, active: 0 })
    // (même PDF que ceux ouverts à la sélection : permet de les réafficher après avoir ouvert une fiche)
  }

  return (
    <Card
      $selected={selected}
      $collapsed={collapsed}
      $clickable={!selected}
      onClick={() => {
        if (!selected) onSelect()
      }}
    >
      <Header $collapsed={collapsed}>
        <Toggle
          type="button"
          aria-expanded={!collapsed}
          aria-label={collapsed ? EXPAND_LABEL : COLLAPSE_LABEL}
          onClick={(e) => {
            e.stopPropagation()
            setExpanded((x) => !x)
          }}
        >
          {collapsed ? '▸' : '▾'}
        </Toggle>
        <Titles $collapsed={collapsed}>
          <Company>
            {item.url ? (
              <a href={item.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                {item.company}
              </a>
            ) : (
              item.company
            )}
          </Company>
          <Title $collapsed={collapsed} title={item.title}>{item.title}</Title>
          {!collapsed && (
            <Meta>
              {formatDate(item.date)}
              {item.location ? ` · ${item.location}` : ''}
            </Meta>
          )}
        </Titles>
        <StatusSelect
          $color={STATUS_COLORS[item.status]}
          value={item.status}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onStatus(e.target.value as Status)}
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </StatusSelect>
      </Header>

      {!collapsed && (
        <ChecksRow>
          <CheckLabel>
            <input
              type="checkbox"
              checked={checks.cv}
              onChange={(e) => onChecks({ ...checks, cv: e.target.checked })}
            />
            {CV_CHECK_LABEL}
          </CheckLabel>
          <CheckLabel>
            <input
              type="checkbox"
              checked={checks.letter}
              onChange={(e) => onChecks({ ...checks, letter: e.target.checked })}
            />
            {LETTER_CHECK_LABEL}
          </CheckLabel>
        </ChecksRow>
      )}
      {!collapsed && <Tabs tabs={tabs} active={tab} onSelect={selectTab} />}
      {!collapsed && tab && (
        <TabContent>
          {tab === TAB_SUMMARY && item.summary && <MarkdownView source={item.summary} />}
          {tab === TAB_QUESTIONS && item.questions && <MarkdownView source={item.questions} maxHeight={520} />}
          {tab === TAB_DETAILS && item.details && <JobDetails details={item.details} />}
          {tab === TAB_CV && (
            <>
              {cvStatus !== 'unknown' && (
                <CvBadge $modified={cvStatus === 'modified'}>
                  {cvStatus === 'modified' ? CV_MODIFIED_LABEL : CV_BASE_LABEL}
                </CvBadge>
              )}
              {/* Par défaut : Markdown mis en forme dans une zone à défilement ; « Modifier » (statut étude) ouvre le texte brut. */}
              {editable && (
                <ModeBar>
                  <LinkButton onClick={() => setCvEditing((e) => !e)}>
                    {cvEditing ? CV_VIEW_LABEL : CV_EDIT_LABEL}
                  </LinkButton>
                </ModeBar>
              )}
              {editable && cvEditing ? (
                <TextSection
                  title={CV_CHANGES_TITLE}
                  value={item.cvChanges}
                  editable
                  rows={14}
                  onChange={onCvChanges}
                />
              ) : item.cvChanges ? (
                <MarkdownView source={item.cvChanges} />
              ) : null}
            </>
          )}
          {tab === TAB_LETTER && (
            <>
              {editable && item.proposals.length > 0 && (
                <Choices>
                  <ChoicesLabel>{PROPOSALS_LABEL}</ChoicesLabel>
                  {item.proposals.map((p) => (
                    <Choice
                      key={p.id}
                      type="button"
                      $active={item.message?.trim() === p.text}
                      title={p.text || EMPTY_PROPOSAL_HINT}
                      onClick={() => onMessage(p.text)}
                    >
                      {p.label}
                    </Choice>
                  ))}
                </Choices>
              )}
              <TextSection
                title={LETTER_TITLE}
                value={item.message}
                editable={editable}
                onChange={onMessage}
                onSave={editable ? saveMixte : undefined}
              />
              {editable && (
                <SaveRow>
                  <SaveButton type="button" onClick={saveMixte}>
                    {SAVE_MIXTE_LABEL}
                  </SaveButton>
                  {mixteState === 'saved' && <SaveFeedback>{SAVED_LABEL}</SaveFeedback>}
                  {mixteState === 'error' && <SaveFeedback $error>{SAVE_FAILED_LABEL}</SaveFeedback>}
                </SaveRow>
              )}
            </>
          )}
          {tab === TAB_KEYWORDS && <KeywordList keywords={item.keywords} offer={item.offer} onOpenPdf={onOpenPdf} onQcm={onQcm} />}
          {tab === TAB_OFFER && (
            <TextSection title={OFFER_LABEL} value={item.offer} editable={false} asField rows={18} onChange={noop} />
          )}
        </TabContent>
      )}
    </Card>
  )
}
