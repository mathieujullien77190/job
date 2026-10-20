import type { View } from '@/types'

export type MenuItem = { id: View; label: string }

export type MenuProps = {
  items: MenuItem[]
  active: View
  onSelect: (view: View) => void
}
