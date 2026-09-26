import type { Movement } from '../MovementList'

export type MovementModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (movement: Movement) => void
}

export type MovementModalFormValues = {
  description: string
  amount: string
  date: string
  category: string
}
