import { NavLink } from 'react-router-dom'
import { MovementItem } from './MovementItem'
import type { MovementsListProps } from './MovementsList.types'
import './MovementsList.scss'

const defaultMovements = [
  {
    description: 'Restaurante',
    detail: 'Hoy, 14:32 · Alimentación',
    amount: '-32,50 €',
    tone: 'negative' as const,
    icon: '🍽️',
    iconClass: 'food',
  },
  {
    description: 'Alquiler',
    detail: '1 de septiembre · Vivienda',
    amount: '-850,00 €',
    tone: 'negative' as const,
    icon: '⌂',
    iconClass: 'home-icon',
  },
  {
    description: 'Nómina',
    detail: '1 de septiembre · Ingresos',
    amount: '+2.450,00 €',
    tone: 'positive' as const,
    icon: '↗',
    iconClass: 'salary',
  },
]

export function MovementsList({ movements = defaultMovements }: MovementsListProps) {
  return (
    <section className="movements-list-card">
      <div className="section-heading">
        <h2>Últimos movimientos</h2>
        <NavLink to="/movimientos">Ver todos</NavLink>
      </div>
      {movements.map((movement) => (
        <MovementItem key={movement.description + movement.detail} {...movement} />
      ))}
    </section>
  )
}
