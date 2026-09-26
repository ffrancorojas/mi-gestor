import { MovementCard } from './MovementCard'
import type { MovementListProps } from './MovementList.types'
import './MovementList.scss'

export function MovementList({ movements }: MovementListProps) {
  if (movements.length === 0) {
    return <p className="movement-list-empty">No hay movimientos entre las fechas seleccionadas.</p>
  }

  return (
    <div className="movement-list">
      {movements.map((movement) => (
        <MovementCard key={movement.id} movement={movement} />
      ))}
    </div>
  )
}
