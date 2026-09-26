import { lazy, Suspense } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout'

const DashboardView = lazy(() =>
  import('@/views/dashboard').then(({ DashboardView: View }) => ({ default: View })),
)
const MovementsView = lazy(() =>
  import('@/views/movements').then(({ MovementsView: View }) => ({ default: View })),
)
const PlaceholderView = lazy(() =>
  import('@/views/placeholder').then(({ PlaceholderView: View }) => ({ default: View })),
)

export function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Box sx={{ display: 'grid', minHeight: '100vh', placeItems: 'center' }}>
            <CircularProgress size={32} />
          </Box>
        }
      >
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<DashboardView />} />
            <Route path="/movimientos" element={<MovementsView />} />
            <Route path="*" element={<PlaceholderView />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
