import { firebaseAuth } from '@/auth'

const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '')

export type RecurringMovement = {
  id: string
  description: string
  amountCents: number
  kind: 'INCOME' | 'EXPENSE'
  frequency: 'WEEKLY' | 'MONTHLY' | 'YEARLY'
  nextOccurrenceAt: string
  active: boolean
  category: { name: string } | null
}

export type Category = {
  id: string
  name: string
  color: string | null
  icon: string | null
  archived: boolean
}

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  if (!apiUrl) throw new Error('La URL de la API no está configurada.')

  const token = await firebaseAuth?.currentUser?.getIdToken()
  if (!token) throw new Error('La sesión ha expirado. Vuelve a iniciar sesión.')

  const response = await fetch(`${apiUrl}/api${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
  })

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { message?: string } | null
    throw new Error(body?.message ?? 'No se pudo completar la operación.')
  }

  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}

export const getRecurringMovements = () => request<RecurringMovement[]>('/recurring-movements')

export const getCategories = () => request<Category[]>('/categories')

export const createCategory = (name: string) =>
  request<Category>('/categories', {
    method: 'POST',
    body: JSON.stringify({ name }),
  })

export const deactivateRecurringMovement = (id: string) =>
  request<RecurringMovement>(`/recurring-movements/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ active: false }),
  })

export const deleteMovement = (id: string) =>
  request<void>(`/movements/${id}`, { method: 'DELETE' })
