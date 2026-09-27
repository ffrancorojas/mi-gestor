import { firebaseAuth } from '@/auth'

const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '')

export type Category = {
  id: string
  name: string
  color: string | null
  icon: string | null
  archived: boolean
}

export type ApiMovement = {
  id: string
  description: string
  amountCents: number
  kind: 'INCOME' | 'EXPENSE'
  occurredAt: string
  notes: string | null
  recurringMovementId: string | null
  category: { id: string; name: string } | null
  account: { id: string; name: string } | null
}

export type RecurringMovement = {
  id: string
  description: string
  amountCents: number
  kind: 'INCOME' | 'EXPENSE'
  frequency: 'WEEKLY' | 'MONTHLY' | 'YEARLY'
  nextOccurrenceAt: string
  active: boolean
  category: { id: string; name: string } | null
}

export type MonthlySalary = {
  id: string
  month: string
  amountCents: number
}

export type DashboardData = {
  month: string
  salary: MonthlySalary | null
  movements: ApiMovement[]
}

export type ReportRow = {
  id: string
  source: 'MOVEMENT' | 'SALARY'
  date: string
  kind: 'INCOME' | 'EXPENSE'
  description: string
  category: string
  account: string | null
  amountCents: number
  notes: string | null
  recurring: boolean
}

export type CreateMovementInput = {
  description: string
  amountCents: number
  kind: 'INCOME' | 'EXPENSE'
  occurredAt: string
  categoryId: string
  isRecurring: boolean
  notes?: string
}

export type CreateRecurringMovementInput = {
  description: string
  amountCents: number
  categoryId: string
  startAt: string
  includeCurrentMonth: boolean
  currentMonthDay?: number
  notes?: string
}

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  if (!apiUrl) throw new Error('La URL de la API no está configurada.')

  const currentUser = firebaseAuth?.currentUser
  if (!currentUser) throw new Error('La sesión ha expirado. Vuelve a iniciar sesión.')

  const token = await currentUser.getIdToken()
  let response: Response

  try {
    response = await fetch(`${apiUrl}/api${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...init?.headers,
      },
    })
  } catch {
    throw new Error('No se pudo conectar con la API. Revisa su URL y la configuración CORS.')
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { message?: string } | null
    throw new Error(body?.message ?? `No se pudo completar la operación (${response.status}).`)
  }

  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}

const buildRangeQuery = (from: string, to: string) => new URLSearchParams({ from, to }).toString()

export const getCategories = () => request<Category[]>('/categories')

export const createCategory = (name: string) =>
  request<Category>('/categories', {
    method: 'POST',
    body: JSON.stringify({ name }),
  })

export const getMovements = (from: string, to: string) =>
  request<ApiMovement[]>(`/movements?${buildRangeQuery(from, to)}`)

export const createMovement = (input: CreateMovementInput) =>
  request<{ movement: ApiMovement; recurringMovement: RecurringMovement | null }>('/movements', {
    method: 'POST',
    body: JSON.stringify(input),
  })

export const deleteMovement = (id: string) =>
  request<void>(`/movements/${id}`, { method: 'DELETE' })

export const getRecurringMovements = () => request<RecurringMovement[]>('/recurring-movements')

export const createRecurringMovement = (input: CreateRecurringMovementInput) =>
  request<{ recurringMovement: RecurringMovement; currentMovement: ApiMovement | null }>(
    '/recurring-movements',
    {
      method: 'POST',
      body: JSON.stringify(input),
    },
  )

export const deactivateRecurringMovement = (id: string) =>
  request<RecurringMovement>(`/recurring-movements/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ active: false }),
  })

export const getSalary = (month: string) =>
  request<MonthlySalary | null>(`/salaries?${new URLSearchParams({ month })}`)

export const saveSalary = (month: string, amountCents: number) =>
  request<MonthlySalary>(`/salaries/${month}`, {
    method: 'PUT',
    body: JSON.stringify({ amountCents }),
  })

export const getDashboard = (month: string) =>
  request<DashboardData>(`/dashboard?${new URLSearchParams({ month })}`)

export const getReportRows = (from: string, to: string) =>
  request<ReportRow[]>(`/reports/movements?${buildRangeQuery(from, to)}`)
