export type TextInputProps = {
  id: string
  label: string
  value: string
  placeholder?: string
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
  required?: boolean
  onChange: (value: string) => void
}
