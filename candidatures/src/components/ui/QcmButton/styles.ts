import styled from 'styled-components'

export const Button = styled.button`
  justify-self: start;
  background: #fff;
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: 99px;
  padding: 2px 12px;
  font-size: 13px;
  font-weight: 600;

  &:hover {
    background: var(--accent);
    color: #fff;
  }
`

export const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`
