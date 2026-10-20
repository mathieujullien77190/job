import { Label, List, Value } from './styles'
import type { JobDetailsProps } from './types'

export const JobDetails = ({ details }: JobDetailsProps) => (
  <List>
    {details.map((d) => (
      <div key={d.label}>
        <Label>{d.label}</Label>
        <Value>{d.value}</Value>
      </div>
    ))}
  </List>
)
