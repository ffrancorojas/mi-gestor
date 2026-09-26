import { type FormEvent, useState } from 'react'
import { SmallText } from '@/components/common'
import {
  MovementList,
  MovementsFilters,
  MovementsHeader,
  MovementsSectionHeader,
} from '@/components/movements'
import { getCurrentDate } from './MovementsView.tools'
import type { Movement } from './MovementsView.types'
import { useMovementsView } from './useMovementsView'
import './MovementsView.scss'

export function MovementsView() {
  const { from, setFrom, to, setTo, isMovementModalOpen, handleMovementModal } = useMovementsView()
  const [movements, setMovements] = useState<Movement[]>([])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(getCurrentDate)
  const [categories] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('mi-gestor-categories') ?? '[]') as string[]
    } catch {
      return []
    }
  })
  const [category, setCategory] = useState('')

  const filteredMovements = movements.filter(
    (movement) => movement.date >= from && movement.date <= to,
  )
  const saveMovement = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const numericAmount = Number(amount.replace(',', '.'))
    if (!description.trim() || !numericAmount || !date || !category) return
    setMovements((current) => [
      {
        id: Date.now(),
        description: description.trim(),
        category,
        date,
        amount: -Math.abs(numericAmount),
        icon: '•',
        iconClass: 'food',
      },
      ...current,
    ])
    setDescription('')
    setAmount('')
    setCategory('')
    handleMovementModal()
  }

  return (
    <>
      <MovementsHeader onOpenModal={handleMovementModal} />
      <MovementsFilters from={from} to={to} onFromChange={setFrom} onToChange={setTo} />
      <section className="content-card movements-list">
        <MovementsSectionHeader resultCount={filteredMovements.length} />
        {filteredMovements.length === 0 ? (
          <p className="empty-state">No hay movimientos entre las fechas seleccionadas.</p>
        ) : (
          <MovementList movements={filteredMovements} />
        )}
      </section>
      {isMovementModalOpen && (
        <div className="modal-backdrop" onMouseDown={handleMovementModal}>
          <section
            className="movement-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-movement-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="modal-heading">
              <h2 id="new-movement-title">Nuevo movimiento</h2>
              <button className="modal-close" onClick={handleMovementModal} aria-label="Cerrar">
                ×
              </button>
            </div>
            <form onSubmit={saveMovement}>
              <label>
                Descripción
                <input
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Ej. Compra supermercado"
                  required
                />
              </label>
              <label>
                Importe
                <input
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="0,00"
                  required
                />
              </label>
              <label>
                Fecha
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                />
              </label>
              <label>
                Categoría
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  required
                  disabled={categories.length === 0}
                >
                  <option value="">
                    {categories.length === 0
                      ? 'No hay categorías creadas'
                      : 'Selecciona una categoría'}
                  </option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              {categories.length === 0 && (
                <SmallText
                  className="category-help"
                  text="Crea primero una categoría desde el menú."
                />
              )}
              <div className="modal-actions">
                <button type="button" className="secondary-button" onClick={handleMovementModal}>
                  Cancelar
                </button>
                <button type="submit" className="primary-button" disabled={!category}>
                  Guardar
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  )
}
