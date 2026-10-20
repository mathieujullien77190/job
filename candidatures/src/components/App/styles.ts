import styled from 'styled-components'

// Deux colonnes : la liste à gauche, le PDF sélectionné à droite (vide tant qu'aucun PDF n'est ouvert).
export const Layout = styled.div<{ $left: number }>`
  display: grid;
  grid-template-columns: ${({ $left }) => `${$left}%`} 8px minmax(0, 1fr);
  align-items: start;
  min-height: 100vh;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

// Barre de redimensionnement entre la liste et le PDF.
export const Divider = styled.div`
  position: sticky;
  top: 0;
  align-self: stretch;
  height: 100vh;
  cursor: col-resize;
  touch-action: none;
  background: var(--border);

  &:hover,
  &:focus-visible {
    background: var(--accent);
    outline: none;
  }

  @media (max-width: 900px) {
    display: none;
  }
`

export const Main = styled.main`
  padding: 32px 24px 64px;
  min-width: 0;

  @media (max-width: 600px) {
    padding: 16px 12px 48px;
  }
`

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
`

export const Heading = styled.h1`
  margin: 0;
`

export const Notice = styled.p`
  margin: 0 0 12px;
  padding: 8px 12px;
  background: #fff;
  border: 1px solid #ef4444;
  border-radius: 8px;
  font-size: 14px;
`

export const SortButton = styled.button`
  background: #fff;
  border: 1px solid var(--field-border);
  border-radius: 8px;
  color: inherit;
  padding: 6px 12px;
  font-size: 14px;
`

export const Count = styled.span`
  font-size: 14px;
  background: var(--accent);
  color: var(--bg);
  border-radius: 99px;
  padding: 2px 10px;
  vertical-align: middle;
`

export const Stats = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
  font-size: 13px;
`

// Pastille de statut cliquable : filtre la liste (active = fond de la couleur du statut).
export const Stat = styled.button<{ $color: string; $active: boolean }>`
  border-radius: 99px;
  padding: 2px 10px;
  font-size: 13px;
  color: var(--fg);
  border: 1px solid ${({ $color }) => $color};
  background: ${({ $active, $color }) => ($active ? `${$color}33` : '#fff')};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
`

export const List = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
  margin-bottom: 32px;
`

export const Empty = styled.p`
  margin: 4px 0 0;
  color: var(--muted);
  font-size: 14px;
`
