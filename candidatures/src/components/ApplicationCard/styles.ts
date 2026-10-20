import styled from 'styled-components'

export const Card = styled.article<{ $selected: boolean; $collapsed: boolean; $clickable: boolean }>`
  background: var(--card);
  border: 1px solid ${({ $selected }) => ($selected ? 'var(--accent)' : 'var(--border)')};
  box-shadow: ${({ $selected }) => ($selected ? '0 0 0 1px var(--accent)' : 'none')};
  border-radius: 12px;
  padding: ${({ $collapsed }) => ($collapsed ? '10px 16px' : '16px')};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'auto')};
  min-width: 0;

  &:hover {
    border-color: ${({ $clickable }) => ($clickable ? 'var(--accent)' : 'inherit')};
  }
`

export const Header = styled.header<{ $collapsed: boolean }>`
  display: flex;
  gap: 12px;
  align-items: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
`

export const Toggle = styled.button`
  flex: none;
  width: 28px;
  height: 28px;
  padding: 0;
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--muted);
  line-height: 1;
`

// Réduit : entreprise et intitulé sur une seule ligne ; déplié : empilés avec les métadonnées.
export const Titles = styled.div<{ $collapsed: boolean }>`
  flex: 1;
  min-width: 0;
  display: ${({ $collapsed }) => ($collapsed ? 'flex' : 'block')};
  align-items: baseline;
  gap: 10px;
`

export const Company = styled.h3`
  margin: 0;
  flex: none;
`

export const Title = styled.p<{ $collapsed: boolean }>`
  margin: 0;
  ${({ $collapsed }) =>
    $collapsed &&
    `
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--muted);
  `}
`

export const Meta = styled.p`
  margin: 4px 0 0;
  color: var(--muted);
  font-size: 14px;
`

export const CvBadge = styled.span<{ $modified: boolean }>`
  display: block;
  width: fit-content;
  margin: 0 0 12px;
  padding: 0 8px;
  border-radius: 99px;
  font-size: 12px;
  background: #fff;
  border: 1px solid ${({ $modified }) => ($modified ? '#22c55e' : '#f59e0b')};
  color: var(--fg);
`

export const Choices = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`

export const ChoicesLabel = styled.span`
  font-size: 13px;
  color: var(--muted);
`

// Proposition de lettre : un clic la copie dans la lettre (et dans le fichier).
export const Choice = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? 'var(--accent)' : '#fff')};
  color: ${({ $active }) => ($active ? '#fff' : 'var(--fg)')};
  border: 1px solid ${({ $active }) => ($active ? 'var(--accent)' : 'var(--field-border)')};
  border-radius: 99px;
  padding: 3px 12px;
  font-size: 13px;
`

export const ChecksRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  margin: 10px 0 12px;
  padding: 8px 12px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
`

export const CheckLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;

  input {
    width: 16px;
    height: 16px;
    padding: 0;
    accent-color: var(--accent);
  }
`

export const ModeBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: -2px 0 6px;
`

export const SaveRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
`

export const SaveButton = styled.button`
  background: var(--accent);
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 14px;
  font-weight: 600;
`

export const SaveFeedback = styled.span<{ $error?: boolean }>`
  font-size: 13px;
  color: ${({ $error }) => ($error ? '#b3261e' : '#15803d')};
`

export const TabContent = styled.div`
  padding: 12px 0 4px;
`

export const StatusSelect = styled.select<{ $color: string }>`
  border-radius: 99px;
  padding: 2px 10px;
  border: 1px solid ${({ $color }) => $color};
  background: var(--card);
`
