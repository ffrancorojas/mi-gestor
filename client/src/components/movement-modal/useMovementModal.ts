import { type FormEvent, useCallback, useState } from 'react'
import { getCurrentDate, parseCurrencyValue } from '@/tools'
import type { MovementModalProps } from './MovementModal.types'

export function useMovementModal({ onClose, onSave }: MovementModalProps) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(getCurrentDate)
  const [category, setCategory] = useState('')
  const [isRecurring, setIsRecurring] = useState(false)
  const categories: string[] = []

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
