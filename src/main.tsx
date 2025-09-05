import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CMS from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CMS />
  </StrictMode>,
)
