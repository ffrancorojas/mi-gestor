import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import type { DatePickerProps } from './DatePicker.types'

export function DatePicker({ id, label, value, min, required = false, onChange }: DatePickerProps) {
  return (
    <MuiDatePicker
      label={label}
      value={value ? dayjs(value) : null}
      minDate={min ? dayjs(min) : undefined}
      format="DD/MM/YYYY"
      onChange={(date) => onChange(date?.format('YYYY-MM-DD') ?? '')}
      slotProps={{
        textField: {
          id,
          required,
          fullWidth: true,
          size: 'small',
        },
      }}
    />
  )
}
