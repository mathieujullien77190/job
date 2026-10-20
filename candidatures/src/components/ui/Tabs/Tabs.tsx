import { Bar, Tab } from './styles'
import type { TabsProps } from './types'

// Onglets purement visuels : le parent détient l'onglet actif (null = aucun) et affiche le contenu.
const Tabs = ({ tabs, active, onSelect }: TabsProps) => (
  <Bar role="tablist">
    {tabs.map((t) => (
      <Tab
        key={t.id}
        type="button"
        role="tab"
        aria-selected={t.id === active}
        $active={t.id === active}
        onClick={() => onSelect(t.id)}
      >
        {t.label}
      </Tab>
    ))}
  </Bar>
)

export default Tabs
