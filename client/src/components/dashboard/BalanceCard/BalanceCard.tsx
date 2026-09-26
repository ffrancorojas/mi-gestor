import { StrongText } from '@/components/common'
import type { BalanceCardProps } from './BalanceCard.types'
import './BalanceCard.scss'

export function BalanceCard({ balance = '4.280,50 €', variation = '+8,4%' }: BalanceCardProps) {
  return (
    <section className="balance-card">
      <div className="card-label">Saldo total</div>
      <StrongText text={balance} />
      <div className="balance-meta">
        <span>{variation}</span> respecto al mes anterior
      </div>
    </section>
  )
}
