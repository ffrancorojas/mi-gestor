export type DatePickerProps = {
  id: string
  label: string
  value: string
  min?: string
  required?: boolean
  onChange: (value: string) => void
}
