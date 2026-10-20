import styled from 'styled-components'

export const List = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
  gap: 6px 16px;
  margin: 0;
  padding: 12px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
`

export const Label = styled.dt`
  color: var(--muted);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`

export const Value = styled.dd`
  margin: 0;
`
