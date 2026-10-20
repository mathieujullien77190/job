import styled from 'styled-components'
import PdfLink from '@/components/ui/PdfLink'

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;

  li {
    display: grid;
    gap: 4px;
  }
`

export const Item = styled(PdfLink)`
  display: grid;
  gap: 2px;
  padding: 10px 12px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: inherit;
  text-decoration: none;

  &:hover {
    border-color: var(--accent);
  }
`

export const Head = styled.span`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
`

export const Level = styled.span<{ $color: string }>`
  font-size: 12px;
  border: 1px solid ${({ $color }) => $color};
  border-radius: 99px;
  padding: 1px 8px;
  white-space: nowrap;
`

export const Line = styled.q`
  display: block;
  font-size: 14px;
  border-left: 3px solid var(--border);
  padding-left: 8px;
  margin: 2px 0;

  &::before,
  &::after {
    content: none;
  }
`

export const Summary = styled.span`
  font-size: 14px;
  color: var(--muted);
`

export const OpenLabel = styled.span`
  font-size: 13px;
  color: var(--accent);
`
