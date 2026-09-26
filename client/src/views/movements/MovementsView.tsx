import { useState } from 'react'
import Paper from '@mui/material/Paper'
import {
  MovementList,
  MovementModal,
  MovementsFilters,
  MovementsHeader,
  MovementsSectionHeader,
} from '@/components'
import type { Movement } from './MovementsView.types'
import { useMovementsView } from './useMovementsView'

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
      <Paper component="section" variant="outlined" sx={{ p: 6 }}>
        <MovementsSectionHeader resultCount={filteredMovements.length} />
        <MovementList movements={filteredMovements} />
      </Paper>
      <MovementModal
        isOpen={isMovementModalOpen}
        onClose={handleMovementModal}
        onSave={handleSaveMovement}
      />
    </>
  )
}
