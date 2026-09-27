export type SalaryFormProps = {
  month: string
  amount: string
  isLoading: boolean
  isSaving: boolean
  error: string
  successMessage: string
  onMonthChange: (value: string) => void
  onAmountChange: (value: string) => void
  onSubmit: () => void
}
