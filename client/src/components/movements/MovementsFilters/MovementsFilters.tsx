import Paper from '@mui/material/Paper'
import { DatePicker } from '@/components/common'
import type { MovementsFiltersProps } from './MovementsFilters.types'

export function MovementsFilters({ from, to, onFromChange, onToChange }: MovementsFiltersProps) {
  return (
    <Paper
      component="section"
      variant="outlined"
      sx={{
        display: 'flex',
        gap: 3,
        p: 6,
        mb: 4,
        '@media (max-width:44rem)': { gap: 2, p: 4 },
      }}
    >
      <DatePicker id="from" label="Desde" value={from} onChange={onFromChange} />
      <DatePicker id="to" label="Hasta" value={to} min={from} onChange={onToChange} />
    </Paper>
  )
}
