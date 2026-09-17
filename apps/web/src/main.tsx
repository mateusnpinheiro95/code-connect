import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/prompt/latin-400.css'
import '@fontsource/prompt/latin-600.css'
import '@fontsource/prompt/latin-ext-400.css'
import '@fontsource/prompt/latin-ext-600.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
