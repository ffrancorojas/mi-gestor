import { lazy, Suspense } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAuth } from '@/auth'
import { AppShell } from '@/components/layout'
import { AuthView } from '@/views/auth'

const DashboardView = lazy(() =>
  import('@/views/dashboard').then(({ DashboardView: View }) => ({ default: View })),
)
const MovementsView = lazy(() =>
  import('@/views/movements').then(({ MovementsView: View }) => ({ default: View })),
)
const PlaceholderView = lazy(() =>
  import('@/views/placeholder').then(({ PlaceholderView: View }) => ({ default: View })),
)
const RecurringView = lazy(() =>
  import('@/views/recurring').then(({ RecurringView: View }) => ({ default: View })),
)
const CategoriesView = lazy(() =>
  import('@/views/categories').then(({ CategoriesView: View }) => ({ default: View })),
)

export function App() {
  const { isConfigured, isLoading, user } = useAuth()

  if (isLoading) {
    return (
      <Box sx={{ display: 'grid', minHeight: '100vh', placeItems: 'center' }}>
        <CircularProgress size={32} />
      </Box>
    )
  }

  if (!isConfigured) return <AuthView configuration />
  if (!user) return <AuthView />

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
            <Route path="/recurrentes" element={<RecurringView />} />
            <Route path="/categorias" element={<CategoriesView />} />
            <Route path="*" element={<PlaceholderView />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
