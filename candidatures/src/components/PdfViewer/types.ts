import type { PdfSelection } from '@/types'

export type PdfViewerProps = {
  selection: PdfSelection | null
  onSelectTab: (index: number) => void
  onClose: () => void
}
