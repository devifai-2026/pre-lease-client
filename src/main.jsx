import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import ErrorBoundary from './Component/ErrorBoundary/ErrorBoundary.jsx'

// Initialize AOS globally
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
  delay: 0,
  easing: 'ease',
  mirror: false,
  anchorPlacement: 'top-bottom',
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)