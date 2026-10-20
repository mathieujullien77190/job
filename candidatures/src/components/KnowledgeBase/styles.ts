import styled from 'styled-components'
import PdfLink from '@/components/ui/PdfLink'

export const Section = styled.section`
  display: grid;
  gap: 12px;
`

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

export const Heading = styled.h1`
  margin: 0;
`

export const Count = styled.span`
  font-size: 14px;
  background: var(--accent);
  color: var(--bg);
  border-radius: 99px;
  padding: 2px 10px;
  vertical-align: middle;
`

export const Search = styled.input`
  width: 100%;
  font-size: 15px;
`

export const Hint = styled.p`
  margin: 0;
  color: var(--muted);
  font-size: 14px;
`

export const Category = styled.h2`
  margin: 8px 0 6px;
  font-size: 13px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 8px;
`

// Fiche + son bouton QCM (le bouton ne peut pas être dans le lien).
export const Item = styled.div`
  display: grid;
  gap: 4px;
  align-content: start;
`

// Une fiche : un clic l'ouvre dans le panneau PDF (Ctrl/clic milieu : nouvel onglet).
export const Card = styled(PdfLink)`
  display: grid;
  gap: 4px;
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

export const Summary = styled.span`
  font-size: 13px;
  color: var(--muted);
`

// Bloc « QCM général » en haut de la liste.
export const Block = styled.section`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 16px;
`

export const BlockTitle = styled.h2`
  margin: 0 0 4px;
  font-size: 16px;
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
