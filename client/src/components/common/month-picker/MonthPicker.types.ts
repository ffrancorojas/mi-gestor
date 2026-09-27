export type MonthPickerProps = {
  id: string
  label: string
  value: string
  required?: boolean
  onChange: (value: string) => void
}
