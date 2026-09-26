export type CurrencyInputProps = {
  id: string
  label: string
  value: string
  placeholder?: string
  currencySymbol?: string
  required?: boolean
  onChange: (value: string) => void
}
