import { SmallText, StrongText } from '@/components/common'
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
        <StrongText text={description} />
        <SmallText text={detail} />
      </div>
      <b className={tone}>{amount}</b>
    </div>
  )
}
