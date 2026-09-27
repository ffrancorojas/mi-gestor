export type Movement = {
  id: string
  description: string
  category: string
  date: string
  amount: number
  kind: 'INCOME' | 'EXPENSE'
  icon: string
  iconClass: string
  isRecurring: boolean
  notes: string | null
}

export type MovementListProps = {
  movements: Movement[]
  onDelete?: (movement: Movement) => void
}
