import type { RecurringMovement } from '@/api'

export type RecurringMovementCardProps = {
  movement: RecurringMovement
  onDeactivate: (movement: RecurringMovement) => void
}
