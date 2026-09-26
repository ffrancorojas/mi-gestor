import Typography from '@mui/material/Typography'
import { RecurringMovementCard } from './components'
import type { RecurringMovementListProps } from './RecurringMovementList.types'

export function RecurringMovementList({ movements, onDeactivate }: RecurringMovementListProps) {
  if (movements.length === 0) {
    return (
      <Typography sx={{ py: 8, color: 'app.textSoft', textAlign: 'center' }}>
        No hay gastos recurrentes activos.
      </Typography>
    )
  }

  return (
    <div>
      {movements.map((movement) => (
        <RecurringMovementCard key={movement.id} movement={movement} onDeactivate={onDeactivate} />
      ))}
    </div>
  )
}
