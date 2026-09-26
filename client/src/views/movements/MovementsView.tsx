import { useState } from 'react'
import {
  MovementList,
  MovementModal,
  MovementsFilters,
  MovementsHeader,
  MovementsSectionHeader,
} from '@/components/movements'
import type { Movement } from './MovementsView.types'
import { useMovementsView } from './useMovementsView'
import './MovementsView.scss'

export function MovementsView() {
  const { from, setFrom, to, setTo, isMovementModalOpen, handleMovementModal } = useMovementsView()
  const [movements, setMovements] = useState<Movement[]>([])

  const filteredMovements = movements.filter(
    (movement) => movement.date >= from && movement.date <= to,
  )

  const handleSaveMovement = (movement: Movement) => {
    setMovements((current) => [movement, ...current])
  }

  return (
    <>
      <MovementsHeader onOpenModal={handleMovementModal} />
      <MovementsFilters from={from} to={to} onFromChange={setFrom} onToChange={setTo} />
      <section className="content-card movements-list">
        <MovementsSectionHeader resultCount={filteredMovements.length} />
        <MovementList movements={filteredMovements} />
      </section>
      <MovementModal
        isOpen={isMovementModalOpen}
        onClose={handleMovementModal}
        onSave={handleSaveMovement}
      />
    </>
  )
}
