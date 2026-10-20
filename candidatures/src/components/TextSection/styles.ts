import styled from 'styled-components'

export const Editor = styled.textarea`
  width: 100%;
  display: block;
  margin: 0;
  resize: vertical;

  /* non modifiable : reste blanc */
  &:read-only {
    background: #fff;
  }
`

export const Preview = styled.pre`
  white-space: pre-wrap;
  font: inherit;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  margin: 0;
`
