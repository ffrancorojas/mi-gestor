import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { NewMovementButton } from './NewMovementButton'
import type { MovementsHeaderProps } from './MovementsHeader.types'

export function MovementsHeader({ onOpenModal }: MovementsHeaderProps) {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 6,
        '@media (max-width:44rem)': { alignItems: 'flex-start' },
      }}
    >
      <Box>
        <Typography
          variant="overline"
          sx={{ color: 'app.textSoft', fontWeight: 700, letterSpacing: '0.08em' }}
        >
          Actividad financiera
        </Typography>
        <Typography
          variant="h1"
          sx={{ mt: 2, '@media (max-width:44rem)': { fontSize: '1.75rem' } }}
        >
          Movimientos
        </Typography>
      </Box>
      <NewMovementButton onClick={onOpenModal} />
    </Box>
  )
}
