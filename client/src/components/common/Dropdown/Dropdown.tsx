import * as Select from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
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
  const hasOptions = options.length > 0
  const displayedPlaceholder = hasOptions ? placeholder : emptyMessage

  return (
    <div className="dropdown">
      <label htmlFor={id}>{label}</label>
      <Select.Root
        value={value}
        required={required}
        disabled={disabled || !hasOptions}
        onValueChange={onChange}
      >
        <Select.Trigger id={id} className="dropdown-trigger" aria-label={label}>
          <Select.Value placeholder={displayedPlaceholder} />
          <Select.Icon className="dropdown-trigger-icon">
            <ChevronDown size={18} aria-hidden="true" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className="dropdown-content"
            position="popper"
            sideOffset={4}
            collisionPadding={16}
          >
            <Select.Viewport className="dropdown-viewport">
              {options.map((option) => (
                <Select.Item key={option.value} className="dropdown-item" value={option.value}>
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator className="dropdown-item-indicator">
                    <Check size={16} aria-hidden="true" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
