import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { ConfirmationDialog } from '@/components/common'
import { RecurringMovementList } from '@/components/recurring-movement-list'
import { MovementModal, RecurringHeader } from '@/components'
import type { RecurringMovement } from '@/api'
import { useRecurringMovements } from './useRecurringMovements'

export function RecurringView() {
  const {
    movements,
    isLoading,
    error,
    deactivate,
    isModalOpen,
    openModal,
    closeModal,
    saveRecurringMovement,
  } = useRecurringMovements()
  const [movementToDeactivate, setMovementToDeactivate] = useState<RecurringMovement | null>(null)

  const handleConfirmDeactivate = async () => {
    if (!movementToDeactivate) return
    await deactivate(movementToDeactivate.id)
    setMovementToDeactivate(null)
  }

  return (
    <>
      <RecurringHeader onOpenModal={openModal} />
      <Paper component="section" variant="outlined" sx={{ p: 4 }}>
        {isLoading ? (
          <Typography sx={{ py: 8, textAlign: 'center' }}>Cargando recurrentes...</Typography>
        ) : error ? (
          <Typography sx={{ py: 8, color: 'error.main', textAlign: 'center' }}>{error}</Typography>
        ) : (
          <RecurringMovementList movements={movements} onDeactivate={setMovementToDeactivate} />
        )}
      </Paper>
      <MovementModal
        isOpen={isModalOpen}
        mode="recurring"
        onClose={closeModal}
        onSave={saveRecurringMovement}
      />
      <ConfirmationDialog
        open={movementToDeactivate !== null}
        title="Dejar de repetir"
        message="¿Quieres dejar de generar este gasto cada mes? Los movimientos de meses anteriores se conservarán."
        confirmText="Dejar de repetir"
        onClose={() => setMovementToDeactivate(null)}
        onConfirm={() => void handleConfirmDeactivate()}
      />
    </>
  )
}
