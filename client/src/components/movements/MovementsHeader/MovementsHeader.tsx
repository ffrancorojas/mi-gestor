import { NewMovementButton } from './NewMovementButton'
import type { MovementsHeaderProps } from './MovementsHeader.types'
import './MovementsHeader.scss'

export function MovementsHeader({ onOpenModal }: MovementsHeaderProps) {
  return (
    <header className="movements-header">
      <div>
        <div className="eyebrow">Actividad financiera</div>
        <h1>Movimientos</h1>
      </div>
      <NewMovementButton onClick={onOpenModal} />
    </header>
  )
}
