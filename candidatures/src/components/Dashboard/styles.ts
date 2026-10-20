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
  margin: 0 0 12px;
  font-size: 16px;
`

export const Figures = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  list-style: none;
  margin: 0;
  padding: 0;
`

export const Figure = styled.li`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;

  strong {
    display: block;
    font-size: 28px;
    line-height: 1.1;
  }

  span {
    color: var(--muted);
    font-size: 13px;
  }
`

export const AddForm = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;

  input {
    flex: 1;
    min-width: 0;
  }
`

export const AddButton = styled.button`
  background: var(--accent);
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 6px 14px;
  font-weight: 600;

  &:disabled {
    opacity: 0.5;
  }
`

// Pile de post-its : chaque note chevauche la précédente.
export const Stack = styled.ul`
  list-style: none;
  margin: 0;
  padding: 4px 6px 0;
  display: flex;
  flex-direction: column;
`

export const Note = styled.li<{ $color: string; $done: boolean }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: ${({ $color }) => $color};
  border-radius: 3px;
  padding: 14px 12px 12px;
  margin-top: -6px;
  box-shadow: 0 2px 6px rgb(0 0 0 / 18%);
  opacity: ${({ $done }) => ($done ? 0.55 : 1)};

  &:first-child {
    margin-top: 0;
  }

  &:hover {
    z-index: 1;
  }
`

export const NoteText = styled.span<{ $done: boolean }>`
  flex: 1;
  min-width: 0;
  font-family: 'Segoe Print', 'Comic Sans MS', cursive;
  font-size: 15px;
  line-height: 1.35;
  overflow-wrap: anywhere;
  text-decoration: ${({ $done }) => ($done ? 'line-through' : 'none')};
`

export const NoteButton = styled.button`
  background: none;
  border: 0;
  padding: 0 4px;
  font-size: 15px;
  line-height: 1;
  color: #4b4b4b;

  &:hover {
    color: #000;
  }
`

export const Hint = styled.p`
  margin: 0;
  color: var(--muted);
  font-size: 14px;
`

export const Notice = styled.p`
  margin: 0 0 12px;
  padding: 8px 12px;
  background: #fff;
  border: 1px solid #ef4444;
  border-radius: 8px;
  font-size: 14px;
`

export const Rows = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
  font-size: 14px;
`

export const Row = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 12px;

  span:last-child {
    color: var(--muted);
    text-align: right;
  }
`

export const Bar = styled.div`
  display: flex;
  height: 14px;
  border-radius: 7px;
  overflow: hidden;
  background: #fff;
  border: 1px solid var(--border);
  margin-bottom: 10px;
`

export const BarPart = styled.span<{ $color: string; $share: number }>`
  background: ${({ $color }) => $color};
  width: ${({ $share }) => $share}%;
`

export const Legend = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 14px;
  font-size: 13px;
`

export const Dot = styled.i<{ $color: string }>`
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  margin-right: 5px;
  background: ${({ $color }) => $color};
`

export const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  align-items: start;
`

export const Sites = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const SiteLink = styled.a`
  display: inline-block;
  background: #fff;
  border: 1px solid var(--field-border);
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    border-color: var(--accent);
  }
`
