import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { MovementItemProps } from './MovementItem.types'

export function MovementItem({
  description,
  detail,
  amount,
  tone,
  icon,
  iconClass,
}: MovementItemProps) {
  const iconAppearance =
    iconClass === 'salary'
      ? { backgroundColor: 'app.positiveBackground', color: 'success.main' }
      : iconClass === 'home-icon'
        ? { backgroundColor: 'app.primaryLight', color: 'primary.main' }
        : { backgroundColor: 'app.foodBackground', color: 'text.primary' }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        py: 4,
        borderBottom: 1,
        borderColor: 'divider',
        '&:last-child': { borderBottom: 0 },
      }}
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
        {icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 700 }}>{description}</Typography>
        <Typography sx={{ mt: 1, color: 'app.textSoft', fontSize: '0.75rem' }}>{detail}</Typography>
      </Box>
      <Typography
        sx={{
          color: tone === 'positive' ? 'success.main' : 'error.main',
          fontSize: '0.875rem',
          fontWeight: 700,
        }}
      >
        {amount}
      </Typography>
    </Box>
  )
}
