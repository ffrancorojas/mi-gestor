import { useCallback, useEffect, useState } from 'react'
import { createMovement, deleteMovement, getMovements } from '@/api'
import type { MovementModalFormValues } from '@/components'
import { getCurrentDate, getFirstDayOfCurrentMonth, mapApiMovement } from '@/tools'
import type { Movement } from './MovementsView.types'

export function useMovementsView() {
  const [from, setFrom] = useState(getFirstDayOfCurrentMonth)
  const [to, setTo] = useState(getCurrentDate)
  const [movements, setMovements] = useState<Movement[]>([])
  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false)
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

  const openMovementModal = useCallback(() => setIsMovementModalOpen(true), [])
  const closeMovementModal = useCallback(() => setIsMovementModalOpen(false), [])
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

  const saveMovement = useCallback(async (values: MovementModalFormValues) => {
    const result = await createMovement({
      description: values.description,
      amountCents: values.amountCents,
      kind: 'EXPENSE',
      occurredAt: values.date,
      categoryId: values.categoryId,
      isRecurring: values.isRecurring,
    })

    setMovements((current) => [mapApiMovement(result.movement), ...current])
  }, [])

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
    closeMovementModal,
    saveMovement,
    movementToDelete,
    setMovementToDelete,
    confirmDelete,
  }
}
