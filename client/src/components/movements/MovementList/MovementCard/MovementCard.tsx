import { SmallText, StrongText } from '@/components/common'
import type { MovementCardProps } from './MovementCard.types'
import './MovementCard.scss'

const formatAmount = (amount: number) =>
  (amount >= 0 ? '+' : '') + amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })

export function MovementCard({ movement }: MovementCardProps) {
  const detail = `${new Date(movement.date + 'T12:00:00').toLocaleDateString('es-ES')} · ${movement.category}`

  return (
    <article className="movement-card">
      <div className={'movement-card-icon ' + movement.iconClass}>{movement.icon}</div>
      <div className="movement-card-content">
        <StrongText text={movement.description} />
        <SmallText text={detail} />
      </div>
      <b className={movement.amount >= 0 ? 'positive' : 'negative'}>
        {formatAmount(movement.amount)}
      </b>
    </article>
  )
}
