import styled from 'styled-components'

export const Scroll = styled.div<{ $maxHeight: number }>`
  max-height: ${({ $maxHeight }) => `${$maxHeight}px`};
  overflow-y: auto;
  padding: 12px 16px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;

  h1 {
    font-size: 17px;
    margin: 0 0 8px;
  }

  h2 {
    font-size: 15px;
    margin: 16px 0 6px;
    padding-bottom: 3px;
    border-bottom: 1px solid var(--border);
    color: var(--accent);
  }

  h3 {
    font-size: 14px;
    margin: 12px 0 4px;
  }

  p {
    margin: 6px 0;
  }

  ul,
  ol {
    margin: 6px 0;
    padding-left: 22px;
  }

  li {
    margin: 2px 0;
  }

  blockquote {
    margin: 8px 0;
    padding: 6px 12px;
    background: var(--card);
    border-left: 3px solid var(--accent);
    border-radius: 0 6px 6px 0;
  }

  blockquote p {
    margin: 2px 0;
  }

  code {
    padding: 1px 5px;
    background: #eef1f6;
    border-radius: 4px;
    font-size: 13px;
  }

  table {
    width: 100%;
    margin: 8px 0;
    border-collapse: collapse;
    font-size: 13px;
  }

  th,
  td {
    padding: 5px 8px;
    border: 1px solid var(--border);
    text-align: left;
    vertical-align: top;
  }

  th {
    background: var(--card);
  }
`
