import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import type { DropdownProps } from './Dropdown.types'

export function Dropdown<T extends object>({
  id,
  label,
  value,
  options,
  valueKey,
  labelKey,
  placeholder,
  emptyMessage = 'No hay opciones disponibles',
  disabled = false,
  required = false,
  onChange,
}: DropdownProps<T>) {
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
        value={value ?? ''}
        label={label}
        notched
        displayEmpty
        required={required}
        onChange={(event) => onChange(event.target.value as T)}
        renderValue={(selected) =>
          typeof selected === 'object' && selected !== null
            ? String((selected as T)[labelKey])
            : displayedPlaceholder
        }
        MenuProps={{
          slotProps: {
            paper: {
              sx: { maxHeight: '17.5rem' },
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={String(option[valueKey])} value={option as unknown as string}>
            {String(option[labelKey])}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
