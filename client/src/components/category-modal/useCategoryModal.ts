import { type FormEvent, useCallback, useState } from 'react'
import type { CategoryModalProps } from './CategoryModal.types'

export function useCategoryModal({ categories, category, onClose, onSave }: CategoryModalProps) {
  const [name, setName] = useState(category?.name ?? '')
  const [error, setError] = useState('')

  const resetForm = useCallback(() => {
    setName('')
    setError('')
  }, [])

  const handleClose = useCallback(() => {
    resetForm()
    onClose()
  }, [onClose, resetForm])

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const normalizedName = name.trim().toLocaleLowerCase()

      if (!normalizedName) return

      if (
        categories.some(
          (currentCategory) =>
            currentCategory.id !== category?.id &&
            currentCategory.name.trim().toLocaleLowerCase() === normalizedName,
        )
      ) {
        setError('Ya existe una categoría con ese nombre.')
        return
      }

      try {
        await onSave(name.trim())
        handleClose()
      } catch (reason) {
        setError(reason instanceof Error ? reason.message : 'No se pudo guardar la categoría.')
      }
    },
    [categories, category?.id, handleClose, name, onSave],
  )

  return { name, setName, error, clearError: () => setError(''), handleClose, handleSubmit }
}
