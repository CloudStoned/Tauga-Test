import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function applySystemTheme() {
  try {
    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches

    const container = document.getElementById('app-root')
    if (!container) return
    container.dataset.theme = prefersDark ? 'dark' : 'light'
  } catch {
    // no-op
  }
}

applySystemTheme()

if (typeof window !== 'undefined' && window.matchMedia) {
  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  if (typeof mql.addEventListener === 'function') {
    mql.addEventListener('change', applySystemTheme)
  } else if (typeof mql.addListener === 'function') {
    mql.addListener(applySystemTheme)
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
