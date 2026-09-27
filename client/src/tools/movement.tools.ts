import type { ApiMovement } from '@/api'
import type { Movement } from '@/components/movement-list'

export const mapApiMovement = (movement: ApiMovement): Movement => {
  const amount = movement.amountCents / 100

  return {
    id: movement.id,
    description: movement.description,
    categoryId: movement.category?.id ?? '',
    category: movement.category?.name ?? 'Sin categoría',
    date: movement.occurredAt.slice(0, 10),
    amount: movement.kind === 'EXPENSE' ? -Math.abs(amount) : Math.abs(amount),
    kind: movement.kind,
    icon: movement.kind === 'INCOME' ? '€' : '•',
    iconClass: movement.kind === 'INCOME' ? 'salary' : 'food',
    isRecurring: movement.recurringMovementId !== null,
    notes: movement.notes,
  }
}

export const formatEuro = (amount: number) =>
  amount.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: 'always',
  })
