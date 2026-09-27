import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { PauseCircle } from 'lucide-react'
import { formatEuro } from '@/tools'
import type { RecurringMovementCardProps } from './RecurringMovementCard.types'

const formatAmount = (
  amountCents: number,
  kind: RecurringMovementCardProps['movement']['kind'],
) => {
  const amount = amountCents / 100
  const sign = kind === 'EXPENSE' ? '-' : '+'
  return `${sign}${formatEuro(Math.abs(amount))}`
}

export function RecurringMovementCard({ movement, onDeactivate }: RecurringMovementCardProps) {
  const nextDate = new Date(movement.nextOccurrenceAt).toLocaleDateString('es-ES')
  const category = movement.category?.name ?? 'Sin categoría'

  return (
    <Paper
      component="article"
      variant="outlined"
      sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 4, mb: 3 }}
    >
      <PauseCircle size={22} color="var(--mui-palette-primary-main)" />
      <div style={{ minWidth: 0, flex: 1 }}>
        <Typography sx={{ fontWeight: 700 }}>{movement.description}</Typography>
        <Typography sx={{ mt: 1, color: 'app.textSoft', fontSize: '0.75rem' }}>
          {category} · Próximo: {nextDate}
        </Typography>
      </div>
      <Typography
        component="strong"
        sx={{ flexShrink: 0, color: movement.kind === 'EXPENSE' ? 'error.main' : 'success.main' }}
      >
        {formatAmount(movement.amountCents, movement.kind)}
      </Typography>
      <IconButton
        aria-label={`Dejar de repetir ${movement.description}`}
        color="warning"
        onClick={() => onDeactivate(movement)}
        size="small"
      >
        <PauseCircle size={20} />
      </IconButton>
    </Paper>
  )
}
