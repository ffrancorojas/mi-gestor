const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/
const monthKeyPattern = /^\d{4}-\d{2}$/

export const parseDateOnly = (value: string | undefined) => {
  if (!value || !dateOnlyPattern.test(value)) return value ? null : undefined

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))

  return date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
    ? date
    : null
}

export const parseMonthKey = (value: string | undefined) => {
  if (!value || !monthKeyPattern.test(value)) return value ? null : undefined

  const [year, month] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, 1))

  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 ? date : null
}

export const getTodayUtc = () => {
  const now = new Date()
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
}

export const getStartOfMonthUtc = (date: Date) =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1))

export const addDaysUtc = (date: Date, days: number) => {
  const next = new Date(date)
  next.setUTCDate(next.getUTCDate() + days)
  return next
}

export const getNextMonthlyOccurrence = (date: Date) => {
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()

  return new Date(Date.UTC(year, month, Math.min(day, lastDay)))
}

export const createDateInMonth = (month: Date, requestedDay: number) => {
  const year = month.getUTCFullYear()
  const monthIndex = month.getUTCMonth()
  const lastDay = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate()

  return new Date(Date.UTC(year, monthIndex, Math.min(requestedDay, lastDay)))
}

export const toMonthKey = (date: Date) =>
  `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`
