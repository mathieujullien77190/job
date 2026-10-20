import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/components/App'
import { KnowledgeProvider } from '@/components/KnowledgeProvider'
import SecretGate from '@/components/SecretGate'
import GlobalStyle from '@/styles/GlobalStyle'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle />
    <SecretGate>
      <KnowledgeProvider>
        <App />
      </KnowledgeProvider>
    </SecretGate>
  </StrictMode>,
)
