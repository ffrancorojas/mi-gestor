import type { MovementItemProps } from './MovementItem.types'
import './MovementItem.scss'

export function MovementItem({
  description,
  detail,
  amount,
  tone,
  icon,
  iconClass,
}: MovementItemProps) {
  return (
    <div className="movement-item">
      <div className={'movement-icon ' + iconClass}>{icon}</div>
      <div className="movement-item-content">
        <strong>{description}</strong>
        <small>{detail}</small>
      </div>
      <b className={tone}>{amount}</b>
    </div>
  )
}
