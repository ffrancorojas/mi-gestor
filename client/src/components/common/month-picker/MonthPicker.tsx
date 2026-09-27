import TextField from '@mui/material/TextField'
import type { MonthPickerProps } from './MonthPicker.types'

export function MonthPicker({ id, label, value, required = false, onChange }: MonthPickerProps) {
  return (
    <TextField
      id={id}
      label={label}
      type="month"
      value={value}
      required={required}
      slotProps={{ inputLabel: { shrink: true } }}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
