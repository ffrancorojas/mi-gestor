import { useEffect, useMemo, useState } from 'react'
import { getDashboard, type DashboardData } from '@/api'
import type { MovementItemData } from '@/components/dashboard'
import { formatEuro, getCurrentMonth } from '@/tools'

export function useDashboardView() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    getDashboard(getCurrentMonth())
      .then((dashboard) => {
        if (isMounted) setData(dashboard)
      })
      .catch((reason: unknown) => {
        if (isMounted) {
          setError(reason instanceof Error ? reason.message : 'No se pudo cargar el resumen.')
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return useMemo(() => {
    const salary = (data?.salary?.amountCents ?? 0) / 100
    const otherIncome =
      data?.movements
        .filter((movement) => movement.kind === 'INCOME')
        .reduce((total, movement) => total + movement.amountCents / 100, 0) ?? 0
    const expenses =
      data?.movements
        .filter((movement) => movement.kind === 'EXPENSE')
        .reduce((total, movement) => total + movement.amountCents / 100, 0) ?? 0
    const movements: MovementItemData[] =
      data?.movements.slice(0, 5).map((movement) => ({
        description: movement.description,
        detail: `${new Date(movement.occurredAt).toLocaleDateString('es-ES')} · ${movement.category?.name ?? 'Sin categoría'}`,
        amount: `${movement.kind === 'EXPENSE' ? '-' : '+'}${formatEuro(
          movement.amountCents / 100,
        )}`,
        tone: movement.kind === 'EXPENSE' ? 'negative' : 'positive',
        icon: movement.kind === 'EXPENSE' ? '•' : '€',
        iconClass: movement.kind === 'EXPENSE' ? 'food' : 'salary',
      })) ?? []

    return {
      salary,
      income: salary + otherIncome,
      expenses,
      remaining: salary + otherIncome - expenses,
      movements,
      isLoading,
      error,
    }
  }, [data, error, isLoading])
}
