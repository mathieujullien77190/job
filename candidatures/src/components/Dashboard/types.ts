import type { Application } from '@/types'

export type DashboardProps = {
  items: Application[]
}

// Action à faire déduite des candidatures (relance, case à cocher)
export type Reminder = { id: string; company: string; text: string }
