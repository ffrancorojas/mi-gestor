import type { TextInputProps } from './TextInput.types'
import './TextInput.scss'

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
    <div className="text-input">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
