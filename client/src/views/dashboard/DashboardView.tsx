import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useAuth } from '@/auth'
import { DashboardHeader } from '@/components/dashboard-header'
import { BalanceCard, MetricCard, MovementsList } from '@/components/dashboard'
import { formatEuro } from '@/tools'
import { useDashboardView } from './useDashboardView'

export function DashboardView() {
  const { user, signOut } = useAuth()
  const dashboard = useDashboardView()

  return (
    <>
      <DashboardHeader displayName={user?.displayName} email={user?.email} onSignOut={signOut} />
      {dashboard.error && (
        <Typography sx={{ mb: 4, color: 'error.main' }}>{dashboard.error}</Typography>
      )}
      <BalanceCard
        balance={dashboard.isLoading ? 'Cargando...' : formatEuro(dashboard.remaining)}
        variation="Disponible este mes"
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 4,
          my: 4,
          '@media (max-width:44rem)': { gap: 2 },
        }}
      >
        <MetricCard
          label="Nómina este mes"
          value={dashboard.isLoading ? '—' : formatEuro(dashboard.salary)}
          change="Importe mensual"
          tone="positive"
        />
        <MetricCard
          label="Gastos este mes"
          value={dashboard.isLoading ? '—' : formatEuro(dashboard.expenses)}
          change="Total del periodo"
          tone="negative"
        />
      </Box>
      <MovementsList movements={dashboard.movements} />
    </>
  )
}
