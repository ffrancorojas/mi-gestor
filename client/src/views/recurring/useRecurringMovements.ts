import { useCallback, useEffect, useState } from 'react'
import { deactivateRecurringMovement, getRecurringMovements } from '@/api'
import type { RecurringMovement } from '@/api'

export function useRecurringMovements() {
  const [movements, setMovements] = useState<RecurringMovement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

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

  return { movements, isLoading, error, deactivate }
}
