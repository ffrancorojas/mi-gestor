import { type FormEvent, useState } from 'react'
import { CalendarDays, Plus } from 'lucide-react'
import type { Movement } from './MovementsView.types'
import './MovementsView.scss'

const initialMovements: Movement[] = [
  {
    id: 1,
    description: 'Restaurante',
    category: 'Alimentación',
    date: '2026-09-26',
    amount: -32.5,
    icon: '🍽️',
    iconClass: 'food',
  },
  {
    id: 2,
    description: 'Alquiler',
    category: 'Vivienda',
    date: '2026-09-01',
    amount: -850,
    icon: '⌂',
    iconClass: 'home-icon',
  },
  {
    id: 3,
    description: 'Nómina',
    category: 'Ingresos',
    date: '2026-09-01',
    amount: 2450,
    icon: '↗',
    iconClass: 'salary',
  },
  {
    id: 4,
    description: 'Supermercado',
    category: 'Alimentación',
    date: '2026-08-28',
    amount: -76.2,
    icon: '🛒',
    iconClass: 'food',
  },
]

const formatAmount = (amount: number) =>
  (amount >= 0 ? '+' : '') + amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })

export function MovementsView() {
  const [from, setFrom] = useState('2026-09-01')
  const [to, setTo] = useState('2026-09-30')
  const [movements, setMovements] = useState(initialMovements)
  const [showForm, setShowForm] = useState(false)
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('2026-09-26')
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
    setShowForm(false)
  }

  return (
    <>
      <div className="page-title-row">
        <div>
          <div className="eyebrow">Actividad financiera</div>
          <h1>Movimientos</h1>
        </div>
        <button className="primary-button" onClick={() => setShowForm(true)}>
          <Plus size={17} /> Nuevo movimiento
        </button>
      </div>
      <section className="filters-card">
        <div className="filter-field">
          <label htmlFor="from">Desde</label>
          <div className="date-input">
            <CalendarDays size={16} />
            <input
              id="from"
              type="date"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
            />
          </div>
        </div>
        <div className="filter-field">
          <label htmlFor="to">Hasta</label>
          <div className="date-input">
            <CalendarDays size={16} />
            <input
              id="to"
              type="date"
              value={to}
              min={from}
              onChange={(event) => setTo(event.target.value)}
            />
          </div>
        </div>
      </section>
      <section className="content-card movements-list">
        <div className="section-heading">
          <h2>Movimientos del periodo</h2>
          <span className="results-count">{filteredMovements.length} resultados</span>
        </div>
        {filteredMovements.length === 0 ? (
          <p className="empty-state">No hay movimientos entre las fechas seleccionadas.</p>
        ) : (
          filteredMovements.map((movement) => (
            <div className="movement" key={movement.id}>
              <div className={'movement-icon ' + movement.iconClass}>{movement.icon}</div>
              <div>
                <strong>{movement.description}</strong>
                <small>
                  {new Date(movement.date + 'T12:00:00').toLocaleDateString('es-ES')} ·{' '}
                  {movement.category}
                </small>
              </div>
              <b className={movement.amount >= 0 ? 'positive' : 'negative'}>
                {formatAmount(movement.amount)}
              </b>
            </div>
          ))
        )}
      </section>
      {showForm && (
        <div className="modal-backdrop" onMouseDown={() => setShowForm(false)}>
          <section
            className="movement-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-movement-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="modal-heading">
              <h2 id="new-movement-title">Nuevo movimiento</h2>
              <button
                className="modal-close"
                onClick={() => setShowForm(false)}
                aria-label="Cerrar"
              >
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
                <small className="category-help">Crea primero una categoría desde el menú.</small>
              )}
              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowForm(false)}
                >
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
