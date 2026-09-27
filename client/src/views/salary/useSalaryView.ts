import { useCallback, useEffect, useState } from 'react'
import { getSalary, saveSalary } from '@/api'
import { formatCurrencyValue, getCurrentMonth, parseCurrencyValue } from '@/tools'

export function useSalaryView() {
  const [month, setMonth] = useState(getCurrentMonth)
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    getSalary(month)
      .then((salary) => {
        if (!isMounted) return
        setAmount(salary ? formatCurrencyValue(String(salary.amountCents / 100)) : '')
      })
      .catch((reason: unknown) => {
        if (isMounted) {
          setError(reason instanceof Error ? reason.message : 'No se pudo cargar la nómina.')
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [month])

  const handleMonthChange = useCallback((value: string) => {
    setIsLoading(true)
    setError('')
    setSuccessMessage('')
    setMonth(value)
  }, [])

  const handleSave = useCallback(async () => {
    const numericAmount = parseCurrencyValue(amount)

    if (numericAmount === null || numericAmount <= 0) {
      setError('Introduce un importe de nómina válido.')
      return
    }

    setIsSaving(true)
    setError('')
    setSuccessMessage('')

    try {
      const salary = await saveSalary(month, Math.round(numericAmount * 100))
      setAmount(formatCurrencyValue(String(salary.amountCents / 100)))
      setSuccessMessage('La nómina del mes se ha guardado correctamente.')
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'No se pudo guardar la nómina.')
    } finally {
      setIsSaving(false)
    }
  }, [amount, month])

  return {
    month,
    setMonth: handleMonthChange,
    amount,
    setAmount,
    isLoading,
    isSaving,
    error,
    successMessage,
    handleSave,
  }
}
