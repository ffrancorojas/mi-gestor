import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from '../components'
import { DashboardView, MovementsView, PlaceholderView } from '../views'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<DashboardView />} />
          <Route path="/movimientos" element={<MovementsView />} />
          <Route path="*" element={<PlaceholderView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
