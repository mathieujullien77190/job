import styled from 'styled-components'

export const Wrap = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`

export const Button = styled.button<{ $on: boolean }>`
  background: ${({ $on }) => ($on ? 'var(--accent)' : '#fff')};
  color: ${({ $on }) => ($on ? '#fff' : 'var(--accent)')};
  border: 1px solid var(--accent);
  border-radius: 99px;
  padding: 2px 12px;
  font-size: 13px;
  font-weight: 600;
`

export const Rate = styled.select`
  font-size: 12px;
  padding: 2px 4px;
`
