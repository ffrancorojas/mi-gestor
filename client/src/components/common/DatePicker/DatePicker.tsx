import { CalendarDays } from 'lucide-react'
import type { DatePickerProps } from './DatePicker.types'
import './DatePicker.scss'

export function DatePicker({ id, label, value, min, onChange }: DatePickerProps) {
  return (
    <div className="date-picker">
      <label htmlFor={id}>{label}</label>
      <div className="date-picker-input">
        <CalendarDays size={16} />
        <input
          id={id}
          type="date"
          value={value}
          min={min}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  )
}
