import type { RecurringMovement } from '@/api'

export type RecurringMovementListProps = {
  movements: RecurringMovement[]
  onDeactivate: (movement: RecurringMovement) => void
}
