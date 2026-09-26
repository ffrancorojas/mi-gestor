import { Plus } from 'lucide-react'
import type { NewMovementButtonProps } from './NewMovementButton.types'
import './NewMovementButton.scss'

export function NewMovementButton({ onClick }: NewMovementButtonProps) {
  return (
    <button className="new-movement-button" onClick={onClick}>
      <Plus size={17} /> Nuevo movimiento
    </button>
  )
}
