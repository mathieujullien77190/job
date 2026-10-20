import styled from 'styled-components'

// Largeur en dessous de laquelle le menu devient un menu « sandwich ».
const PHONE = '600px'

export const Bar = styled.nav`
  position: relative;
  margin-bottom: 20px;
  width: fit-content;
  max-width: 100%;

  @media (max-width: ${PHONE}) {
    width: 100%;
  }
`

// Bouton ☰ : visible seulement sur téléphone, affiche la vue courante.
export const Burger = styled.button`
  display: none;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 14px;
  background: #fff;
  color: var(--fg);
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  text-align: left;

  span {
    font-size: 18px;
    line-height: 1;
  }

  @media (max-width: ${PHONE}) {
    display: flex;
  }
`

export const Items = styled.div<{ $open: boolean }>`
  display: flex;
  gap: 4px;
  padding: 4px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 10px;

  @media (max-width: ${PHONE}) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    z-index: 10;
    box-shadow: 0 6px 18px rgb(0 0 0 / 15%);
  }
`

export const Item = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? 'var(--accent)' : 'none')};
  color: ${({ $active }) => ($active ? '#fff' : 'var(--fg)')};
  border: 0;
  border-radius: 7px;
  padding: 6px 14px;
  white-space: nowrap;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  text-align: left;

  &:hover {
    background: ${({ $active }) => ($active ? 'var(--accent)' : 'var(--card)')};
  }

  @media (max-width: ${PHONE}) {
    padding: 10px 14px;
    font-size: 15px;
  }
`
