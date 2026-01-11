import '@fontsource/hind/700.css' // bold
import '@fontsource/open-sans' // 400/normal/regular
import '@fontsource/open-sans/500.css' // medium
import '@fontsource/open-sans/600.css' // semibold
import '@fontsource/open-sans/700.css' // bold
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './layouts/overwrites.css'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
