import { type FormEvent, useCallback, useMemo, useState } from 'react'
import { CATEGORY_PREVIEW_DATA, getCurrentDate, parseCurrencyValue } from '@/tools'
import type { MovementModalProps } from './MovementModal.types'

const getStoredCategories = () => {
  try {
    const storedCategories: unknown = JSON.parse(
      localStorage.getItem('mi-gestor-categories') ?? '[]',
    )

    if (
      Array.isArray(storedCategories) &&
      storedCategories.length > 0 &&
      storedCategories.every((category) => typeof category === 'string')
    ) {
      return storedCategories
    }

    return CATEGORY_PREVIEW_DATA
  } catch {
    return CATEGORY_PREVIEW_DATA
  }
}

export function useMovementModal({ isOpen, onClose, onSave }: MovementModalProps) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(getCurrentDate)
  const [category, setCategory] = useState('')
  const [isRecurring, setIsRecurring] = useState(false)
  const categories = useMemo(() => (isOpen ? getStoredCategories() : []), [isOpen])

  const resetForm = useCallback(() => {
    setDescription('')
    setAmount('')
    setDate(getCurrentDate())
    setCategory('')
    setIsRecurring(false)
  }, [])

  const handleClose = useCallback(() => {
    resetForm()
    onClose()
  }, [onClose, resetForm])

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const numericAmount = parseCurrencyValue(amount)

      if (
        !description.trim() ||
        numericAmount === null ||
        numericAmount === 0 ||
        !date ||
        !category
      )
        return

      onSave({
        id: Date.now(),
        description: description.trim(),
        category,
        date,
        amount: -Math.abs(numericAmount),
        icon: '•',
        iconClass: 'food',
        isRecurring,
      })
      handleClose()
    },
    [amount, category, date, description, handleClose, isRecurring, onSave],
  )

  return {
    description,
    setDescription,
    amount,
    setAmount,
    date,
    setDate,
    category,
    setCategory,
    isRecurring,
    setIsRecurring,
    categories,
    categoryOptions: categories.map((item) => ({ label: item, value: item })),
    handleClose,
    handleSubmit,
  }
}
