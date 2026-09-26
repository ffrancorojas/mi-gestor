import { useCallback, useState } from 'react'
import { getCurrentDate, getFirstDayOfCurrentMonth } from './MovementsView.tools'

export function useMovementsView() {
  const [from, setFrom] = useState(getFirstDayOfCurrentMonth)
  const [to, setTo] = useState(getCurrentDate)
  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false)

  const handleMovementModal = useCallback(() => {
    setIsMovementModalOpen((isOpen) => !isOpen)
  }, [])

  return {
    from,
    setFrom,
    to,
    setTo,
    isMovementModalOpen,
    handleMovementModal,
  }
}
