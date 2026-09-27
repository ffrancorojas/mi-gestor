import { useCallback, useEffect, useState } from 'react'
import { createMovement, deleteMovement, getMovements, updateMovement } from '@/api'
import type { MovementModalFormValues } from '@/components'
import { getCurrentDate, getFirstDayOfCurrentMonth, mapApiMovement } from '@/tools'
import type { Movement } from './MovementsView.types'

export function useMovementsView() {
  const [from, setFrom] = useState(getFirstDayOfCurrentMonth)
  const [to, setTo] = useState(getCurrentDate)
  const [movements, setMovements] = useState<Movement[]>([])
  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false)
  const [movementToEdit, setMovementToEdit] = useState<Movement | null>(null)
  const [movementToDelete, setMovementToDelete] = useState<Movement | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    getMovements(from, to)
      .then((data) => {
        if (isMounted) setMovements(data.map(mapApiMovement))
      })
      .catch((reason: unknown) => {
        if (isMounted) {
          setError(
            reason instanceof Error ? reason.message : 'No se pudieron cargar los movimientos.',
          )
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [from, to])

  const openMovementModal = useCallback(() => {
    setMovementToEdit(null)
    setIsMovementModalOpen(true)
  }, [])
  const openEditMovementModal = useCallback((movement: Movement) => {
    setMovementToEdit(movement)
    setIsMovementModalOpen(true)
  }, [])
  const closeMovementModal = useCallback(() => {
    setIsMovementModalOpen(false)
    setMovementToEdit(null)
  }, [])
  const handleFromChange = useCallback((value: string) => {
    setIsLoading(true)
    setError('')
    setFrom(value)
  }, [])
  const handleToChange = useCallback((value: string) => {
    setIsLoading(true)
    setError('')
    setTo(value)
  }, [])

  const saveMovement = useCallback(
    async (values: MovementModalFormValues) => {
      if (movementToEdit) {
        const movement = await updateMovement(movementToEdit.id, {
          description: values.description,
          amountCents: values.amountCents,
          kind: movementToEdit.kind,
          occurredAt: values.date,
          categoryId: values.categoryId,
          notes: movementToEdit.notes ?? undefined,
        })
        const updatedMovement = mapApiMovement(movement)

        setMovements((current) =>
          values.date >= from && values.date <= to
            ? current.map((item) => (item.id === updatedMovement.id ? updatedMovement : item))
            : current.filter((item) => item.id !== updatedMovement.id),
        )
        return
      }

      const result = await createMovement({
        description: values.description,
        amountCents: values.amountCents,
        kind: 'EXPENSE',
        occurredAt: values.date,
        categoryId: values.categoryId,
        isRecurring: values.isRecurring,
      })

      setMovements((current) => [mapApiMovement(result.movement), ...current])
    },
    [from, movementToEdit, to],
  )

  const confirmDelete = useCallback(async () => {
    if (!movementToDelete) return

    await deleteMovement(movementToDelete.id)
    setMovements((current) => current.filter(({ id }) => id !== movementToDelete.id))
    setMovementToDelete(null)
  }, [movementToDelete])

  return {
    from,
    setFrom: handleFromChange,
    to,
    setTo: handleToChange,
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
  }
}
