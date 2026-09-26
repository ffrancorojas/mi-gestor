import { useLocation } from 'react-router-dom'
import type { PlaceholderViewProps } from './PlaceholderView.types'
import './PlaceholderView.scss'

export function PlaceholderView({ title }: PlaceholderViewProps) {
  const { pathname } = useLocation()
  const pageTitle = title ?? (pathname.slice(1).replace('-', ' ') || 'Página')
  return (
    <section className="placeholder-page">
      <div className="eyebrow">Próximamente</div>
      <h2>{pageTitle}</h2>
      <p>Esta pantalla ya tiene su ruta preparada para conectarla con el backend.</p>
    </section>
  )
}
