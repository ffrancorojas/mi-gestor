import { BalanceCard, MetricCard, MovementsList } from '../../components/dashboard'
import './DashboardView.scss'

export function DashboardView() {
  return (
    <>
      <div className="welcome-row">
        <div>
          <div className="eyebrow">Sábado, 26 de septiembre</div>
          <h1>Tu resumen</h1>
        </div>
        <button className="avatar" aria-label="Abrir perfil">
          FR
        </button>
      </div>
      <BalanceCard />
      <div className="metric-grid">
        <MetricCard label="Ingresos este mes" value="2.450,00 €" change="+12,5%" tone="positive" />
        <MetricCard label="Gastos este mes" value="1.120,30 €" change="-4,2%" tone="negative" />
      </div>
      <MovementsList />
    </>
  )
}
