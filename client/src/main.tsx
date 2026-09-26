import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App, { Dashboard, MovementsPage, PagePlaceholder } from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><BrowserRouter><Routes><Route element={<App />}><Route path="/" element={<Dashboard />} /><Route path="/movimientos" element={<MovementsPage />} /><Route path="*" element={<PagePlaceholder />} /></Route></Routes></BrowserRouter></React.StrictMode>,
)

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'))
