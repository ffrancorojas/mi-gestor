import { DatePicker } from '@/components/common'
import type { MovementsFiltersProps } from './MovementsFilters.types'
import './MovementsFilters.scss'

export function MovementsFilters({ from, to, onFromChange, onToChange }: MovementsFiltersProps) {
  return (
    <section className="movements-filters">
      <DatePicker id="from" label="Desde" value={from} onChange={onFromChange} />
      <DatePicker id="to" label="Hasta" value={to} min={from} onChange={onToChange} />
    </section>
  )
}
