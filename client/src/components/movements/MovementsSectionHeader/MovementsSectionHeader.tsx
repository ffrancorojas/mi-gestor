import { SmallText } from '@/components/common'
import type { MovementsSectionHeaderProps } from './MovementsSectionHeader.types'
import './MovementsSectionHeader.scss'

export function MovementsSectionHeader({ resultCount }: MovementsSectionHeaderProps) {
  const resultLabel = `${resultCount} ${resultCount === 1 ? 'resultado' : 'resultados'}`

  return (
    <header className="movements-section-header">
      <h2>Movimientos del periodo</h2>
      <SmallText className="movements-result-count" text={resultLabel} />
    </header>
  )
}
