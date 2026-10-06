import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './stili.css'

createRoot(document.getElementById('koren')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)