import { useState } from 'react'
import Paper from '@mui/material/Paper'
import { deleteMovement } from '@/api'
import { ConfirmationDialog } from '@/components/common'
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
  const [movementToDelete, setMovementToDelete] = useState<Movement | null>(null)

  const filteredMovements = movements.filter(
    (movement) => movement.date >= from && movement.date <= to,
  )

  const handleSaveMovement = (movement: Movement) => {
    setMovements((current) => [movement, ...current])
  }

  const handleConfirmDelete = async () => {
    if (!movementToDelete) return

    if (typeof movementToDelete.id === 'string') await deleteMovement(movementToDelete.id)
    setMovements((current) => current.filter(({ id }) => id !== movementToDelete.id))
    setMovementToDelete(null)
  }

  return (
    <>
      <MovementsHeader onOpenModal={handleMovementModal} />
      <MovementsFilters from={from} to={to} onFromChange={setFrom} onToChange={setTo} />
      <Paper component="section" variant="outlined" sx={{ p: 6 }}>
        <MovementsSectionHeader resultCount={filteredMovements.length} />
        <MovementList movements={filteredMovements} onDelete={setMovementToDelete} />
      </Paper>
      <MovementModal
        isOpen={isMovementModalOpen}
        onClose={handleMovementModal}
        onSave={handleSaveMovement}
      />
      <ConfirmationDialog
        open={movementToDelete !== null}
        title="Eliminar movimiento"
        message="¿Quieres eliminar este movimiento? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        onClose={() => setMovementToDelete(null)}
        onConfirm={() => void handleConfirmDelete()}
      />
    </>
  )
}
