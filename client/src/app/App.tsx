import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { DashboardView } from '../views/dashboard'
import { MovementsView } from '../views/movements'
import { PlaceholderView } from '../views/placeholder'

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
