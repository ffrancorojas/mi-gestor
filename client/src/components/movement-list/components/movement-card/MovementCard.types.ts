import type { Movement } from '../../MovementList.types'

export type MovementCardProps = {
  movement: Movement
  onDelete?: (movement: Movement) => void
}
