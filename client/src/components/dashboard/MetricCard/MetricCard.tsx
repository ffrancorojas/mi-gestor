import { StrongText } from '@/components/common'
import type { MetricCardProps } from './MetricCard.types'
import './MetricCard.scss'

export function MetricCard({ label, value, change, tone }: MetricCardProps) {
  return (
    <article className="metric-card">
      <span>{label}</span>
      <StrongText text={value} />
      <em className={tone}>{change}</em>
    </article>
  )
}
