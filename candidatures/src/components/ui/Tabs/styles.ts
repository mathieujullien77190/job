import styled from 'styled-components'

export const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  border-bottom: 1px solid var(--border);
`

export const Tab = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? 'var(--card)' : 'none')};
  border: 1px solid ${({ $active }) => ($active ? 'var(--border)' : 'transparent')};
  border-bottom-color: ${({ $active }) => ($active ? 'var(--card)' : 'transparent')};
  border-radius: 8px 8px 0 0;
  color: ${({ $active }) => ($active ? 'var(--accent)' : 'var(--muted)')};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  padding: 6px 12px;
  margin-bottom: -1px;
`
