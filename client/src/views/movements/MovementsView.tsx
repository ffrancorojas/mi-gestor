import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { ConfirmationDialog } from '@/components/common'
import {
  MovementList,
  MovementModal,
  MovementsFilters,
  MovementsHeader,
  MovementsSectionHeader,
} from '@/components'
import { useMovementsView } from './useMovementsView'

export function MovementsView() {
  const {
    from,
    setFrom,
    to,
    setTo,
    movements,
    isLoading,
    error,
    isMovementModalOpen,
    openMovementModal,
    openEditMovementModal,
    closeMovementModal,
    saveMovement,
    movementToEdit,
    movementToDelete,
    setMovementToDelete,
    confirmDelete,
  } = useMovementsView()

  return (
    <>
      <MovementsHeader onOpenModal={openMovementModal} />
      <MovementsFilters from={from} to={to} onFromChange={setFrom} onToChange={setTo} />
      <Paper component="section" variant="outlined" sx={{ p: 6 }}>
        <MovementsSectionHeader resultCount={movements.length} />
        {isLoading ? (
          <Typography sx={{ py: 8, textAlign: 'center' }}>Cargando movimientos...</Typography>
        ) : error ? (
          <Typography sx={{ py: 8, color: 'error.main', textAlign: 'center' }}>{error}</Typography>
        ) : (
          <MovementList
            movements={movements}
            onEdit={openEditMovementModal}
            onDelete={setMovementToDelete}
          />
        )}
      </Paper>
      <MovementModal
        key={movementToEdit?.id ?? 'new-movement'}
        isOpen={isMovementModalOpen}
        initialValues={
          movementToEdit
            ? {
                description: movementToEdit.description,
                amountCents: Math.round(Math.abs(movementToEdit.amount) * 100),
                date: movementToEdit.date,
                categoryId: movementToEdit.categoryId,
                isRecurring: movementToEdit.isRecurring,
              }
            : undefined
        }
        onClose={closeMovementModal}
        onSave={saveMovement}
      />
      <ConfirmationDialog
        open={movementToDelete !== null}
        title="Eliminar movimiento"
        message="¿Quieres eliminar este movimiento? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        onClose={() => setMovementToDelete(null)}
        onConfirm={() => void confirmDelete()}
      />
    </>
  )
}
