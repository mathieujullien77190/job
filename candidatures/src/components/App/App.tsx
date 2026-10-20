import { useMemo, useState } from 'react'
import ApplicationCard from '@/components/ApplicationCard'
import Dashboard from '@/components/Dashboard'
import KnowledgeBase from '@/components/KnowledgeBase'
import type { KnowledgeTarget } from '@/components/KnowledgeBase/types'
import PdfViewer from '@/components/PdfViewer'
import Menu from '@/components/ui/Menu'
import { STATUSES, STATUS_COLORS } from '@/constants'
import type { PdfSelection, SortOrder, Status, View } from '@/types'
import {
  API_ERROR_LABEL,
  EMPTY_LABEL,
  FILTER_HINT,
  LOADING_LABEL,
  MENU_ITEMS,
  RESIZE_LABEL,
  SAVE_ERROR_LABEL,
  SORT_ASC_LABEL,
  SORT_DESC_LABEL,
  TITLE,
} from './constants'
import { countByStatus, filterByStatus, sortByDate } from './helpers'
import { Count, Divider, Empty, Heading, Layout, List, Main, Notice, SortButton, Stat, Stats, TopBar } from './styles'
import { useApplications } from './useApplications'
import { useSplit } from './useSplit'

export const App = () => {
  const { items, load, saveError, update, saveMixte } = useApplications()
  const [view, setView] = useState<View>('dashboard')
  const [pdf, setPdf] = useState<PdfSelection | null>(null)
  // Candidature sélectionnée (ses CV s'affichent à droite) : la plus récente tant qu'on n'en a pas choisi une autre.
  // undefined : choix par défaut ; null : tout désélectionné.
  const [selectedId, setSelectedId] = useState<string | null | undefined>(undefined)
  const [statusFilter, setStatusFilter] = useState<Status | null>(null)
  const [order, setOrder] = useState<SortOrder>('desc')
  const split = useSplit()
  // Bouton d'une fiche dans une candidature : ouvre la base de connaissance et lance le QCM ou les questions ouvertes de la fiche.
  const [qcmTarget, setQcmTarget] = useState<KnowledgeTarget | null>(null)
  const openQcm = (id: string, mode: KnowledgeTarget['mode'] = 'qcm') => {
    setQcmTarget({ id, nonce: Date.now(), mode })
    setView('knowledge')
  }

  const shown = useMemo(() => sortByDate(filterByStatus(items, statusFilter), order), [items, statusFilter, order])
  const currentId = selectedId === undefined ? (sortByDate(items, 'desc')[0]?.id ?? null) : selectedId

  return (
    <>
      <Layout $left={split.left}>
        <Main
          onClick={(e) => {
            // clic à côté d'une candidature (ni carte, ni bouton, ni champ) : désélection
            if (!(e.target as HTMLElement).closest('article, button, a, input, textarea, select, label')) setSelectedId(null)
          }}
        >
          <Menu items={MENU_ITEMS} active={view} onSelect={setView} />
          {view === 'knowledge' ? (
            <KnowledgeBase onOpenPdf={setPdf} target={qcmTarget} onTargetUsed={() => setQcmTarget(null)} />
          ) : view === 'dashboard' ? (
            <Dashboard items={items} />
          ) : (
            <>
              <TopBar>
                <Heading>
                  {TITLE} <Count>{items.length}</Count>
                </Heading>
                <SortButton type="button" onClick={() => setOrder((o) => (o === 'desc' ? 'asc' : 'desc'))}>
                  {order === 'desc' ? SORT_DESC_LABEL : SORT_ASC_LABEL}
                </SortButton>
              </TopBar>
              {load === 'error' && <Notice role="alert">{API_ERROR_LABEL}</Notice>}
              {saveError && <Notice role="alert">{SAVE_ERROR_LABEL} : {saveError}</Notice>}
              <Stats title={FILTER_HINT}>
                {STATUSES.map((s) => (
                  <li key={s}>
                    <Stat
                      type="button"
                      $color={STATUS_COLORS[s]}
                      $active={statusFilter === s}
                      aria-pressed={statusFilter === s}
                      onClick={() => setStatusFilter((current) => (current === s ? null : s))}
                    >
                      {s} : {countByStatus(items, s)}
                    </Stat>
                  </li>
                ))}
              </Stats>
              <List>
                {shown.map((a) => (
                  <ApplicationCard
                    key={a.id}
                    item={a}
                    selected={a.id === currentId}
                    onSelect={() => setSelectedId(a.id)}
                    onStatus={(status) => update(a.id, { status })}
                    onMessage={(message) => update(a.id, { message })}
                    onCvChanges={(cvChanges) => update(a.id, { cvChanges })}
                    onChecks={(checks) => update(a.id, { checks })}
                    onSaveMixte={(text) => saveMixte(a.id, text)}
                    onOpenPdf={setPdf}
                    onQcm={openQcm}
                  />
                ))}
                {load === 'loading' && <Empty>{LOADING_LABEL}</Empty>}
                {load === 'ready' && shown.length === 0 && <Empty>{EMPTY_LABEL}</Empty>}
              </List>
            </>
          )}
        </Main>
        <Divider
          role="separator"
          aria-orientation="vertical"
          aria-label={RESIZE_LABEL}
          aria-valuenow={Math.round(split.left)}
          tabIndex={0}
          {...split.handleProps}
        />
        <PdfViewer
          selection={pdf}
          onSelectTab={(active) => setPdf((p) => (p ? { ...p, active } : p))}
          onClose={() => setPdf(null)}
        />
      </Layout>
    </>
  )
}
