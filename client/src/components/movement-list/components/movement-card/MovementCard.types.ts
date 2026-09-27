import type { Movement } from '../../MovementList.types'

export type MovementCardProps = {
  movement: Movement
  onEdit?: (movement: Movement) => void
  onDelete?: (movement: Movement) => void
}
