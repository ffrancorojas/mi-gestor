import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { MovementCard } from './MovementCard'
import type { MovementListProps } from './MovementList.types'

export function MovementList({ movements }: MovementListProps) {
  if (movements.length === 0) {
    return (
      <Typography sx={{ py: 6, color: 'app.textSoft', fontSize: '0.75rem', textAlign: 'center' }}>
        No hay movimientos entre las fechas seleccionadas.
      </Typography>
    )
  }

  return (
    <Box sx={{ display: 'grid', gap: 3 }}>
      {movements.map((movement) => (
        <MovementCard key={movement.id} movement={movement} />
      ))}
    </Box>
  )
}
