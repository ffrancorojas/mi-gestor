export type Movement = {
  id: number | string
  description: string
  category: string
  date: string
  amount: number
  icon: string
  iconClass: string
  isRecurring: boolean
}

export type MovementListProps = {
  movements: Movement[]
  onDelete?: (movement: Movement) => void
}
