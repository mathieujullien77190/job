import styled from 'styled-components'

export const Panel = styled.aside`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;

  @media (max-width: 900px) {
    position: static;
    height: 80vh;
    border-top: 1px solid var(--border);
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;

  button {
    background: none;
    border: 1px solid var(--border);
    border-radius: 6px;
    color: inherit;
    padding: 2px 8px;
  }
`

export const Title = styled.strong`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Frame = styled.iframe`
  flex: 1;
  width: 100%;
  border: 0;
  border-radius: 8px;
  background: #fff;
`

export const Empty = styled.p`
  margin: 0;
  color: var(--muted);
  font-size: 14px;
`
