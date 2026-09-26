import { formatCurrencyValue } from '@/tools'
import type { CurrencyInputProps } from './CurrencyInput.types'
import './CurrencyInput.scss'

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
    <div className="currency-input">
      <label htmlFor={id}>{label}</label>
      <div className="currency-input-control">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={(event) => onChange(event.target.value)}
          onBlur={handleBlur}
        />
        <span aria-hidden="true">{currencySymbol}</span>
      </div>
    </div>
  )
}
