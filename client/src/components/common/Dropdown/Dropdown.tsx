import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import type { DropdownProps } from './Dropdown.types'

export function Dropdown({
  id,
  label,
  value,
  options,
  placeholder,
  emptyMessage = 'No hay opciones disponibles',
  disabled = false,
  required = false,
  onChange,
}: DropdownProps) {
  const hasOptions = options.length > 0
  const displayedPlaceholder = hasOptions ? placeholder : emptyMessage
  const labelId = `${id}-label`

  return (
    <FormControl fullWidth size="small" required={required} disabled={disabled || !hasOptions}>
      <InputLabel id={labelId} shrink>
        {label}
      </InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value}
        label={label}
        notched
        displayEmpty
        required={required}
        onChange={(event) => onChange(event.target.value)}
        renderValue={(selected) => selected || displayedPlaceholder}
        MenuProps={{
          slotProps: {
            paper: {
              sx: { maxHeight: '17.5rem' },
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
