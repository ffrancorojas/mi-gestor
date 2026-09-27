import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/auth'
import { BalanceCard, MetricCard, MovementsList } from '@/components/dashboard'
import { formatEuro } from '@/tools'
import { useDashboardView } from './useDashboardView'

export function DashboardView() {
  const { user, signOut } = useAuth()
  const dashboard = useDashboardView()
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null)
  const displayName = user?.displayName?.trim() ?? ''
  const initials = displayName
    ? displayName
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
    : (user?.email?.slice(0, 2).toUpperCase() ?? '??')
  const today = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())

  const handleProfileClose = () => setProfileAnchor(null)

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
            {today}
          </Typography>
          <Typography
            variant="h1"
            sx={{ mt: 2, '@media (max-width:44rem)': { fontSize: '1.75rem' } }}
          >
            Tu resumen
          </Typography>
        </Box>
        <IconButton
          aria-label="Abrir perfil"
          aria-controls={profileAnchor ? 'profile-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={profileAnchor ? 'true' : undefined}
          onClick={(event) => setProfileAnchor(event.currentTarget)}
          sx={{ p: 0 }}
        >
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
            {initials}
          </Avatar>
        </IconButton>
        <Menu
          id="profile-menu"
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={handleProfileClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem
            onClick={() => {
              handleProfileClose()
              void signOut()
            }}
          >
            <LogOut size={18} style={{ marginRight: '0.5rem' }} />
            Cerrar sesión
          </MenuItem>
        </Menu>
      </Box>
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
