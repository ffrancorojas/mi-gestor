import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { BalanceCard, MetricCard, MovementsList } from '@/components/dashboard'

export function DashboardView() {
  return (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 6 }}
      >
        <Box>
          <Typography
            variant="overline"
            sx={{ color: 'app.textSoft', fontWeight: 700, letterSpacing: '0.08em' }}
          >
            Sábado, 26 de septiembre
          </Typography>
          <Typography
            variant="h1"
            sx={{ mt: 2, '@media (max-width:44rem)': { fontSize: '1.75rem' } }}
          >
            Tu resumen
          </Typography>
        </Box>
        <IconButton aria-label="Abrir perfil" sx={{ p: 0 }}>
          <Avatar
            sx={{
              width: '2.5rem',
              height: '2.5rem',
              color: 'primary.main',
              backgroundColor: 'app.primaryLight',
              fontSize: '0.875rem',
              fontWeight: 800,
            }}
          >
            FR
          </Avatar>
        </IconButton>
      </Box>
      <BalanceCard />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 4,
          my: 4,
          '@media (max-width:44rem)': { gap: 2 },
        }}
      >
        <MetricCard label="Ingresos este mes" value="2.450,00 €" change="+12,5%" tone="positive" />
        <MetricCard label="Gastos este mes" value="1.120,30 €" change="-4,2%" tone="negative" />
      </Box>
      <MovementsList />
    </>
  )
}
