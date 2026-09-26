import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import type { MovementCardProps } from './MovementCard.types'

const formatAmount = (amount: number) =>
  (amount >= 0 ? '+' : '') + amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })

export function MovementCard({ movement }: MovementCardProps) {
  const detail = `${new Date(movement.date + 'T12:00:00').toLocaleDateString('es-ES')} · ${movement.category}`
  const iconAppearance =
    movement.iconClass === 'salary'
      ? { backgroundColor: 'app.positiveBackground', color: 'success.main' }
      : movement.iconClass === 'home-icon'
        ? { backgroundColor: 'app.primaryLight', color: 'primary.main' }
        : { backgroundColor: 'app.foodBackground', color: 'text.primary' }

  return (
    <Paper
      component="article"
      variant="outlined"
      sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 3, borderColor: 'app.borderSoft' }}
    >
      <Box
        sx={{
          ...iconAppearance,
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: 3,
          fontSize: '1.25rem',
        }}
      >
        {movement.icon}
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 700 }}>
          {movement.description}
        </Typography>
        <Typography sx={{ mt: 1, color: 'app.textSoft', fontSize: '0.75rem' }}>{detail}</Typography>
      </Box>
      <Typography
        component="strong"
        sx={{
          flexShrink: 0,
          color: movement.amount >= 0 ? 'success.main' : 'error.main',
          fontWeight: 700,
        }}
      >
        {formatAmount(movement.amount)}
      </Typography>
    </Paper>
  )
}
