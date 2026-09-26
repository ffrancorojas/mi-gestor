export type DropdownOption = {
  label: string
  value: string
}

export type DropdownProps = {
  id: string
  label: string
  value: string
  options: DropdownOption[]
  placeholder: string
  emptyMessage?: string
  disabled?: boolean
  required?: boolean
  onChange: (value: string) => void
}
