import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx' // Import ThemeProvider
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> {/* Wrap App with ThemeProvider */}
      <App />
    </ThemeProvider>
  </StrictMode>,
)
