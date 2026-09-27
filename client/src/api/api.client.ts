import { firebaseAuth } from '@/auth'
import { markApiAsWaking, markApiRequestAsFinished } from './api-status.store'

const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '')
const RETRYABLE_STATUS_CODES = new Set([502, 503, 504])
const RETRYABLE_METHODS = new Set(['GET', 'HEAD', 'PUT', 'PATCH', 'DELETE'])
const MAX_ATTEMPTS = 10
const RETRY_DELAY_MS = 5_000
const SLOW_REQUEST_NOTICE_DELAY_MS = 1_500

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

export type UpdateMovementInput = Omit<CreateMovementInput, 'isRecurring'>

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
  const method = init?.method?.toUpperCase() ?? 'GET'
  const canRetry = RETRYABLE_METHODS.has(method)
  const requestId = Symbol(path)
  const slowRequestTimer = window.setTimeout(
    () => markApiAsWaking(requestId),
    SLOW_REQUEST_NOTICE_DELAY_MS,
  )

  try {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
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
        if (canRetry && attempt < MAX_ATTEMPTS) {
          markApiAsWaking(requestId)
          await new Promise((resolve) => window.setTimeout(resolve, RETRY_DELAY_MS))
          continue
        }

        throw new Error(
          canRetry
            ? 'El servidor sigue sin responder. Espera unos segundos y vuelve a intentarlo.'
            : 'El servidor puede estar iniciándose. Espera unos segundos y vuelve a intentarlo.',
        )
      }

      if (RETRYABLE_STATUS_CODES.has(response.status) && canRetry && attempt < MAX_ATTEMPTS) {
        markApiAsWaking(requestId)
        await new Promise((resolve) => window.setTimeout(resolve, RETRY_DELAY_MS))
        continue
      }

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { message?: string } | null
        throw new Error(body?.message ?? `No se pudo completar la operación (${response.status}).`)
      }

      if (response.status === 204) return undefined as T
      return response.json() as Promise<T>
    }

    throw new Error('El servidor sigue sin responder. Espera unos segundos y vuelve a intentarlo.')
  } finally {
    window.clearTimeout(slowRequestTimer)
    markApiRequestAsFinished(requestId)
  }
}

const buildRangeQuery = (from: string, to: string) => new URLSearchParams({ from, to }).toString()

export const getCategories = () => request<Category[]>('/categories')

export const createCategory = (name: string) =>
  request<Category>('/categories', {
    method: 'POST',
    body: JSON.stringify({ name }),
  })

export const updateCategory = (id: string, name: string) =>
  request<Category>(`/categories/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ name }),
  })

export const getMovements = (from: string, to: string) =>
  request<ApiMovement[]>(`/movements?${buildRangeQuery(from, to)}`)

export const createMovement = (input: CreateMovementInput) =>
  request<{ movement: ApiMovement; recurringMovement: RecurringMovement | null }>('/movements', {
    method: 'POST',
    body: JSON.stringify(input),
  })

export const updateMovement = (id: string, input: UpdateMovementInput) =>
  request<ApiMovement>(`/movements/${id}`, {
    method: 'PATCH',
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
