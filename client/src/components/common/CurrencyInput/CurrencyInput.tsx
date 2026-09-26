import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { formatCurrencyValue } from '@/tools'
import type { CurrencyInputProps } from './CurrencyInput.types'

export function CurrencyInput({
  id,
  label,
  value,
  placeholder = '0,00',
  currencySymbol = '€',
  required = false,
  onChange,
}: CurrencyInputProps) {
  const handleBlur = () => {
    if (value) onChange(formatCurrencyValue(value))
  }

  return (
    <TextField
      id={id}
      label={label}
      type="text"
      value={value}
      placeholder={placeholder}
      required={required}
      slotProps={{
        htmlInput: { inputMode: 'decimal' },
        input: {
          endAdornment: <InputAdornment position="end">{currencySymbol}</InputAdornment>,
        },
      }}
      onChange={(event) => onChange(event.target.value)}
      onBlur={handleBlur}
    />
  )
}
