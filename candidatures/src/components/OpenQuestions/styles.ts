import styled from 'styled-components'

export const Section = styled.section`
  display: grid;
  gap: 20px;
`

export const Heading = styled.h1`
  margin: 0;
`

export const Block = styled.section`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
`

export const BlockTitle = styled.h2`
  margin: 0 0 4px;
  font-size: 16px;
`

export const Hint = styled.p`
  margin: 0 0 12px;
  color: var(--muted);
  font-size: 14px;
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;

  label {
    font-size: 14px;
  }
`

export const Start = styled.button`
  background: var(--accent);
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
`

export const Category = styled.h3`
  margin: 16px 0 8px;
  font-size: 13px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
`

export const Grid = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(240px, 100%), 1fr));
  gap: 10px;
`

export const FicheButton = styled.button`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  text-align: left;
  background: #fff;
  color: var(--fg);
  border: 1px solid var(--field-border);
  border-radius: 10px;
  padding: 10px 12px;

  &:hover {
    border-color: var(--accent);
  }

  span {
    flex: none;
    color: var(--muted);
    font-size: 13px;
  }
`

export const Empty = styled.p`
  margin: 0;
  color: var(--muted);
  font-size: 14px;
`

export const Back = styled.button`
  background: none;
  border: 0;
  color: var(--accent);
  padding: 0;
  font-size: 14px;
  justify-self: start;
`

export const Questions = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 16px;
`

export const OpenCard = styled.li`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;

  textarea {
    width: 100%;
    min-height: 160px;
    resize: vertical;
    margin-top: 10px;
  }

  h3 {
    margin: 0;
    font-size: 16px;
    line-height: 1.35;
  }
`

export const SaveState = styled.p`
  margin: 6px 0 0;
  font-size: 12px;
  color: var(--muted);
`

export const Review = styled.div<{ $status: 'correct' | 'partiel' | 'incorrect' | 'pending' }>`
  margin-top: 12px;
  padding: 10px 12px;
  background: #fff;
  border-left: 4px solid
    ${({ $status }) => ({ correct: '#22c55e', partiel: '#f59e0b', incorrect: '#ef4444', pending: '#9ca3af' })[$status]};
  border-radius: 6px;
  font-size: 14px;

  strong {
    display: block;
    margin-bottom: 4px;
  }

  p {
    margin: 4px 0 0;
    white-space: pre-wrap;
  }
`
