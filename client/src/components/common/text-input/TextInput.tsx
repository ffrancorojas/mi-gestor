import TextField from '@mui/material/TextField'
import type { TextInputProps } from './TextInput.types'

export function TextInput({
  id,
  label,
  value,
  placeholder,
  inputMode = 'text',
  required = false,
  onChange,
}: TextInputProps) {
  return (
    <TextField
      id={id}
      label={label}
      type="text"
      value={value}
      placeholder={placeholder}
      required={required}
      slotProps={{ htmlInput: { inputMode } }}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
