import { createGlobalStyle } from 'styled-components'

// Styles globaux : variables de thème et éléments de base. Le reste est dans les styles.ts des composants.
const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #f5f6f8;
    --fg: #1c2330;
    --muted: #667085;
    --card: #fbf7ee;
    --border: #ebe1cc;
    --accent: #1f4e8c;
    --field: #fff;
    --field-border: #bfb08a;
    color-scheme: light;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: var(--bg);
    color: var(--fg);
    font: 16px/1.5 system-ui, sans-serif;
  }

  input,
  textarea,
  select {
    font: inherit;
    color: inherit;
    background: var(--field);
    border: 1px solid var(--field-border);
    border-radius: 8px;
    padding: 8px 10px;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid var(--accent);
    outline-offset: 0;
  }

  button {
    font: inherit;
    cursor: pointer;
  }

  /* Écran tactile : zones de toucher assez grandes, pas de zoom automatique sur les champs. */
  @media (pointer: coarse) {
    button {
      min-height: 36px;
    }
    input,
    textarea,
    select {
      font-size: 16px;
    }
  }

  img,
  iframe {
    max-width: 100%;
  }

  a {
    color: var(--accent);
  }

  mark {
    background: #fde047;
    color: #1c2330;
    border-radius: 3px;
    padding: 0 2px;
  }
`

export default GlobalStyle
