import type { DropdownProps } from './Dropdown.types'
import './Dropdown.scss'

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
  return (
    <div className="dropdown">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        required={required}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">{options.length === 0 ? emptyMessage : placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
