import styled from 'styled-components'

export const Button = styled.button<{ $danger?: boolean }>`
  background: none;
  border: 0;
  color: ${({ $danger }) => ($danger ? '#ef4444' : 'var(--accent)')};
  padding: 4px 0;
  margin-right: 12px;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`
