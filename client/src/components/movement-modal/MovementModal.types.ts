export type MovementModalProps = {
  isOpen: boolean
  mode?: 'movement' | 'recurring'
  onClose: () => void
  onSave: (values: MovementModalFormValues) => Promise<void> | void
}

export type MovementModalFormValues = {
  description: string
  amountCents: number
  date: string
  categoryId: string
  isRecurring: boolean
  includeCurrentMonth: boolean
  currentMonthDay?: number
}
