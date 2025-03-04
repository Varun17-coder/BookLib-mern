import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'

// for notification style
import { SnackbarProvider } from 'notistack'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <SnackbarProvider>
    <App />
  </SnackbarProvider>
  </BrowserRouter>,
)
