import { MovementCard } from './MovementCard'
import type { MovementListProps } from './MovementList.types'
import './MovementList.scss'

export function MovementList({ movements }: MovementListProps) {
  return (
    <div className="movement-list">
      {movements.map((movement) => (
        <MovementCard key={movement.id} movement={movement} />
      ))}
    </div>
  )
}
