export type DropdownProps<T extends object> = {
  id: string
  label: string
  value: T | null
  options: T[]
  valueKey: keyof T
  labelKey: keyof T
  placeholder: string
  emptyMessage?: string
  disabled?: boolean
  required?: boolean
  onChange: (value: T) => void
}
