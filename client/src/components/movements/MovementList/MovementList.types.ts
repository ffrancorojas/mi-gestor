export type Movement = {
  id: number
  description: string
  category: string
  date: string
  amount: number
  icon: string
  iconClass: string
}

export type MovementListProps = {
  movements: Movement[]
}
