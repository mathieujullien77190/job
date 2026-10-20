import styled from 'styled-components'

export const Wrap = styled.section`
  display: grid;
  gap: 16px;
`

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
`

export const Back = styled.button`
  background: none;
  border: 0;
  color: var(--accent);
  padding: 0;
  font-size: 14px;
`

export const Progress = styled.div`
  height: 8px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 99px;
  overflow: hidden;

  span {
    display: block;
    height: 100%;
    background: var(--accent);
  }
`

export const Meta = styled.p`
  margin: 0;
  color: var(--muted);
  font-size: 13px;
`

export const Card = styled.article`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
`

export const Question = styled.h2`
  margin: 0 0 14px;
  font-size: 18px;
  line-height: 1.35;
`

export const Choices = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
`

type ChoiceState = 'idle' | 'right' | 'wrong' | 'missed'

const COLORS: Record<ChoiceState, { bg: string; border: string }> = {
  idle: { bg: '#fff', border: 'var(--field-border)' },
  right: { bg: '#dcfce7', border: '#22c55e' },
  wrong: { bg: '#fee2e2', border: '#ef4444' },
  missed: { bg: '#dcfce7', border: '#22c55e' },
}

export const Choice = styled.button<{ $state: ChoiceState; $locked: boolean }>`
  display: flex;
  gap: 10px;
  width: 100%;
  align-items: flex-start;
  text-align: left;
  background: ${({ $state }) => COLORS[$state].bg};
  border: 1px solid ${({ $state }) => COLORS[$state].border};
  border-radius: 10px;
  padding: 10px 12px;
  color: var(--fg);
  cursor: ${({ $locked }) => ($locked ? 'default' : 'pointer')};

  &:hover {
    border-color: ${({ $locked, $state }) => ($locked ? COLORS[$state].border : 'var(--accent)')};
  }

  b {
    flex: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--bg);
    font-size: 12px;
    display: grid;
    place-items: center;
  }

  span {
    min-width: 0;
    overflow-wrap: anywhere;
  }
`

export const Feedback = styled.div<{ $right: boolean }>`
  margin-top: 14px;
  padding: 10px 12px;
  background: #fff;
  border-left: 4px solid ${({ $right }) => ($right ? '#22c55e' : '#ef4444')};
  border-radius: 6px;
  font-size: 14px;

  strong {
    display: block;
    margin-bottom: 2px;
  }
`

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
`

export const Primary = styled.button`
  background: var(--accent);
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
`

export const Secondary = styled.button`
  background: #fff;
  color: var(--fg);
  border: 1px solid var(--field-border);
  border-radius: 8px;
  padding: 8px 16px;
`

export const Score = styled.p`
  margin: 0;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.1;

  small {
    font-size: 16px;
    font-weight: 400;
    color: var(--muted);
  }
`

export const Mistakes = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;

  li {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 14px;
  }

  p {
    margin: 4px 0 0;
  }
`
