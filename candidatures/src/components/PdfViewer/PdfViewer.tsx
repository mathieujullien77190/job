import Tabs from '@/components/ui/Tabs'
import { CLOSE_LABEL, EMPTY_LABEL, NEW_TAB_LABEL } from './constants'
import { Empty, Frame, Header, Panel, Title } from './styles'
import type { PdfViewerProps } from './types'

export const PdfViewer = ({ selection, onSelectTab, onClose }: PdfViewerProps) => {
  const doc = selection?.docs[selection.active]

  return (
    <Panel>
      {selection && doc ? (
        <>
          <Header>
            <Title title={selection.heading}>{selection.heading}</Title>
            <a href={doc.url} target="_blank" rel="noreferrer">{NEW_TAB_LABEL}</a>
            <button type="button" onClick={onClose} aria-label={CLOSE_LABEL}>✕</button>
          </Header>
          {selection.docs.length > 1 && (
            <Tabs
              tabs={selection.docs.map((d, i) => ({ id: String(i), label: d.title }))}
              active={String(selection.active)}
              onSelect={(id) => onSelectTab(Number(id))}
            />
          )}
          <Frame key={doc.url} src={doc.url} title={doc.title} />
        </>
      ) : (
        <Empty>{EMPTY_LABEL}</Empty>
      )}
    </Panel>
  )
}
