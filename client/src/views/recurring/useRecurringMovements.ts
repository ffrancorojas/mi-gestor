import { useCallback, useEffect, useState } from 'react'
import { createRecurringMovement, deactivateRecurringMovement, getRecurringMovements } from '@/api'
import type { RecurringMovement } from '@/api'
import type { MovementModalFormValues } from '@/components'

export function useRecurringMovements() {
  const [movements, setMovements] = useState<RecurringMovement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    let isMounted = true

    getRecurringMovements()
      .then((data) => {
        if (isMounted) setMovements(data)
      })
      .catch((reason: unknown) => {
        if (isMounted) {
          setError(
            reason instanceof Error ? reason.message : 'No se pudieron cargar los recurrentes.',
          )
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const deactivate = useCallback(async (id: string) => {
    await deactivateRecurringMovement(id)
    setMovements((current) => current.filter((movement) => movement.id !== id))
  }, [])

  const saveRecurringMovement = useCallback(async (values: MovementModalFormValues) => {
    const result = await createRecurringMovement({
      description: values.description,
      amountCents: values.amountCents,
      categoryId: values.categoryId,
      startAt: values.date,
      includeCurrentMonth: values.includeCurrentMonth,
      currentMonthDay: values.currentMonthDay,
    })

    setMovements((current) =>
      [...current, result.recurringMovement].sort(
        (left, right) =>
          new Date(left.nextOccurrenceAt).getTime() - new Date(right.nextOccurrenceAt).getTime(),
      ),
    )
  }, [])

  return {
    movements,
    isLoading,
    error,
    deactivate,
    isModalOpen,
    openModal: () => setIsModalOpen(true),
    closeModal: () => setIsModalOpen(false),
    saveRecurringMovement,
  }
}
