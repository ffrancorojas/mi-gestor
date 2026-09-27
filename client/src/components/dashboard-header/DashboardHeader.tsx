import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ProfileMenu } from '@/components/profile-menu'

type DashboardHeaderProps = {
  displayName: string | null | undefined
  email: string | null | undefined
  onSignOut: () => void | Promise<void>
}

export function DashboardHeader({ displayName, email, onSignOut }: DashboardHeaderProps) {
  const today = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())

  return (
    <Box
      component="header"
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
      <ProfileMenu displayName={displayName} email={email} onSignOut={onSignOut} />
    </Box>
  )
}
