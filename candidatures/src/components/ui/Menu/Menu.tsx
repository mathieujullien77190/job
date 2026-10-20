import { useState } from 'react'
import { Bar, Burger, Item, Items } from './styles'
import type { MenuProps } from './types'

const BURGER_LABEL = 'Menu'

// Menu du haut : une entrée par vue, la vue active est surlignée.
// Sur téléphone, il se replie en bouton « sandwich » (☰) qui ouvre la liste des vues.
const Menu = ({ items, active, onSelect }: MenuProps) => {
  const [open, setOpen] = useState(false)
  const current = items.find((it) => it.id === active)

  return (
    <Bar role="navigation">
      <Burger type="button" aria-expanded={open} aria-label={BURGER_LABEL} onClick={() => setOpen((o) => !o)}>
        <span aria-hidden="true">{open ? '✕' : '☰'}</span> {current?.label ?? BURGER_LABEL}
      </Burger>
      <Items $open={open}>
        {items.map((it) => (
          <Item
            key={it.id}
            type="button"
            $active={it.id === active}
            aria-current={it.id === active ? 'page' : undefined}
            onClick={() => {
              onSelect(it.id)
              setOpen(false)
            }}
          >
            {it.label}
          </Item>
        ))}
      </Items>
    </Bar>
  )
}

export default Menu
