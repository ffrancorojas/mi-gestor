export const formatDateForInput = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const getFirstDayOfCurrentMonth = () => {
  const today = new Date()
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  return formatDateForInput(firstDayOfMonth)
}

export const getCurrentDate = () => formatDateForInput(new Date())

export const getCurrentMonth = () => getCurrentDate().slice(0, 7)

export const getFirstDayOfNextMonth = () => {
  const today = new Date()
  return formatDateForInput(new Date(today.getFullYear(), today.getMonth() + 1, 1))
}

export const getDefaultRecurringDate = () => {
  const today = new Date()
  const targetYear = today.getMonth() === 11 ? today.getFullYear() + 1 : today.getFullYear()
  const targetMonth = (today.getMonth() + 1) % 12
  const lastDay = new Date(targetYear, targetMonth + 1, 0).getDate()

  return formatDateForInput(new Date(targetYear, targetMonth, Math.min(today.getDate(), lastDay)))
}
