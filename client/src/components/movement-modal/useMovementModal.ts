import { type FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { getCategories, type Category } from '@/api'
import {
  getCurrentDate,
  getDefaultRecurringDate,
  getFirstDayOfNextMonth,
  formatCurrencyValue,
  parseCurrencyValue,
} from '@/tools'
import type { MovementModalProps } from './MovementModal.types'

export function useMovementModal({
  isOpen,
  mode = 'movement',
  initialValues,
  onClose,
  onSave,
}: MovementModalProps) {
  const recurringMode = mode === 'recurring'
  const editingMode = Boolean(initialValues)
  const [description, setDescription] = useState(initialValues?.description ?? '')
  const [amount, setAmount] = useState(
    initialValues ? formatCurrencyValue(String(initialValues.amountCents / 100)) : '',
  )
  const [date, setDate] = useState(
    initialValues?.date ?? (recurringMode ? getDefaultRecurringDate : getCurrentDate),
  )
  const [categoryId, setCategoryId] = useState(initialValues?.categoryId ?? '')
  const [isRecurring, setIsRecurring] = useState(initialValues?.isRecurring ?? recurringMode)
  const [includeCurrentMonth, setIncludeCurrentMonth] = useState(false)
  const [currentMonthDay, setCurrentMonthDay] = useState(String(new Date().getDate()))
  const [categories, setCategories] = useState<Category[]>([])
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    let isMounted = true

    getCategories()
      .then((data) => {
        if (isMounted) setCategories(data)
      })
      .catch((reason: unknown) => {
        if (isMounted) {
          setError(
            reason instanceof Error ? reason.message : 'No se pudieron cargar las categorías.',
          )
        }
      })

    return () => {
      isMounted = false
    }
  }, [isOpen])

  const resetForm = useCallback(() => {
    setDescription(initialValues?.description ?? '')
    setAmount(initialValues ? formatCurrencyValue(String(initialValues.amountCents / 100)) : '')
    setDate(initialValues?.date ?? (recurringMode ? getDefaultRecurringDate() : getCurrentDate()))
    setCategoryId(initialValues?.categoryId ?? '')
    setIsRecurring(initialValues?.isRecurring ?? recurringMode)
    setIncludeCurrentMonth(false)
    setCurrentMonthDay(String(new Date().getDate()))
    setError('')
  }, [initialValues, recurringMode])

  const handleClose = useCallback(() => {
    if (isSubmitting) return
    resetForm()
    onClose()
  }, [isSubmitting, onClose, resetForm])

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setError('')

      const numericAmount = parseCurrencyValue(amount)
      const numericDay = Number(currentMonthDay)

      if (
        !description.trim() ||
        numericAmount === null ||
        numericAmount <= 0 ||
        !date ||
        !categoryId
      ) {
        setError('Completa todos los campos obligatorios.')
        return
      }

      if (
        recurringMode &&
        includeCurrentMonth &&
        (!Number.isInteger(numericDay) || numericDay < 1 || numericDay > 31)
      ) {
        setError('El día del mes debe estar entre 1 y 31.')
        return
      }

      setIsSubmitting(true)

      try {
        await onSave({
          description: description.trim(),
          amountCents: Math.round(numericAmount * 100),
          date,
          categoryId,
          isRecurring: recurringMode || isRecurring,
          includeCurrentMonth,
          currentMonthDay: recurringMode && includeCurrentMonth ? numericDay : undefined,
        })
        resetForm()
        onClose()
      } catch (reason) {
        setError(reason instanceof Error ? reason.message : 'No se pudo guardar el movimiento.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [
      amount,
      categoryId,
      currentMonthDay,
      date,
      description,
      includeCurrentMonth,
      isRecurring,
      onClose,
      onSave,
      recurringMode,
      resetForm,
    ],
  )

  const categoryOptions = useMemo(
    () => categories.map((category) => ({ label: category.name, value: category.id })),
    [categories],
  )

  return {
    description,
    setDescription,
    amount,
    setAmount,
    date,
    setDate,
    categoryId,
    setCategoryId,
    isRecurring: recurringMode || isRecurring,
    setIsRecurring,
    includeCurrentMonth,
    setIncludeCurrentMonth,
    currentMonthDay,
    setCurrentMonthDay,
    categories,
    categoryOptions,
    error,
    isSubmitting,
    recurringMode,
    editingMode,
    minimumDate: recurringMode && !editingMode ? getFirstDayOfNextMonth() : undefined,
    handleClose,
    handleSubmit,
  }
}
