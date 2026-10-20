export type TabItem = { id: string; label: string }

export type TabsProps = {
  tabs: TabItem[]
  active: string | null
  onSelect: (id: string) => void
}
