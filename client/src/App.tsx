import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { BarChart3, CalendarDays, CreditCard, Home, Menu, Plus, Repeat2, Settings, Tag, WalletCards, X } from 'lucide-react'
import './App.css'
import './movement-form.css'

type MenuItemProps = { label: string; icon: React.ReactNode; to: string }

const menuItems: MenuItemProps[] = [
  { label: 'Resumen', icon: <Home size={20} />, to: '/' },
  { label: 'Movimientos', icon: <CreditCard size={20} />, to: '/movimientos' },
  { label: 'Cuentas', icon: <WalletCards size={20} />, to: '/cuentas' },
  { label: 'Recurrentes', icon: <Repeat2 size={20} />, to: '/recurrentes' },
  { label: 'Categorías', icon: <Tag size={20} />, to: '/categorias' },
  { label: 'Informes', icon: <BarChart3 size={20} />, to: '/informes' },
]

export function MenuItem({ label, icon, to }: MenuItemProps) {
  return <NavLink to={to} className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>{icon}<span>{label}</span></NavLink>
}

export function PagePlaceholder() {
  const { pathname } = useLocation()
  const page = menuItems.find((item) => item.to === pathname)?.label ?? 'Página'
  return <section className="placeholder-page"><div className="eyebrow">Próximamente</div><h2>{page}</h2><p>Esta pantalla ya tiene su ruta preparada para conectarla con el backend.</p></section>
}

export function Dashboard() {
  return <>
    <div className="welcome-row"><div><div className="eyebrow">Sábado, 26 de septiembre</div><h1>Tu resumen</h1></div><button className="avatar" aria-label="Abrir perfil">FR</button></div>
    <section className="balance-card"><div className="card-label">Saldo total</div><strong>4.280,50 €</strong><div className="balance-meta"><span>+8,4%</span> respecto al mes anterior</div></section>
    <div className="metric-grid"><article className="metric-card"><span>Ingresos este mes</span><strong>2.450,00 €</strong><em className="positive">+12,5%</em></article><article className="metric-card"><span>Gastos este mes</span><strong>1.120,30 €</strong><em className="negative">-4,2%</em></article></div>
    <section className="content-card"><div className="section-heading"><h2>Últimos movimientos</h2><NavLink to="/movimientos">Ver todos</NavLink></div>
      <div className="movement"><div className="movement-icon food">🍽️</div><div><strong>Restaurante</strong><small>Hoy, 14:32 · Alimentación</small></div><b className="negative">-32,50 €</b></div>
      <div className="movement"><div className="movement-icon home-icon">⌂</div><div><strong>Alquiler</strong><small>1 de septiembre · Vivienda</small></div><b className="negative">-850,00 €</b></div>
      <div className="movement"><div className="movement-icon salary">↗</div><div><strong>Nómina</strong><small>1 de septiembre · Ingresos</small></div><b className="positive">+2.450,00 €</b></div>
    </section>
  </>
}

type Movement = { id: number; description: string; category: string; date: string; amount: number; icon: string; iconClass: string }

const initialMovements: Movement[] = [
  { id: 1, description: 'Restaurante', category: 'Alimentación', date: '2026-09-26', amount: -32.5, icon: '🍽️', iconClass: 'food' },
  { id: 2, description: 'Alquiler', category: 'Vivienda', date: '2026-09-01', amount: -850, icon: '⌂', iconClass: 'home-icon' },
  { id: 3, description: 'Nómina', category: 'Ingresos', date: '2026-09-01', amount: 2450, icon: '↗', iconClass: 'salary' },
  { id: 4, description: 'Supermercado', category: 'Alimentación', date: '2026-08-28', amount: -76.2, icon: '🛒', iconClass: 'food' },
]

const formatAmount = (amount: number) => `${amount >= 0 ? '+' : ''}${amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}`

export function MovementsPage() {
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

  const filteredMovements = movements.filter((movement) => movement.date >= from && movement.date <= to)
  const saveMovement = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const numericAmount = Number(amount.replace(',', '.'))
    if (!description.trim() || !numericAmount || !date || !category) return
    setMovements((current) => [{ id: Date.now(), description: description.trim(), category, date, amount: -Math.abs(numericAmount), icon: '•', iconClass: 'food' }, ...current])
    setDescription('')
    setAmount('')
    setCategory('')
    setShowForm(false)
  }

  return <>
    <div className="page-title-row"><div><div className="eyebrow">Actividad financiera</div><h1>Movimientos</h1></div><button className="primary-button" onClick={() => setShowForm(true)}><Plus size={17} /> Nuevo movimiento</button></div>
    <section className="filters-card">
      <div className="filter-field"><label htmlFor="from">Desde</label><div className="date-input"><CalendarDays size={16} /><input id="from" type="date" value={from} onChange={(event) => setFrom(event.target.value)} /></div></div>
      <div className="filter-field"><label htmlFor="to">Hasta</label><div className="date-input"><CalendarDays size={16} /><input id="to" type="date" value={to} min={from} onChange={(event) => setTo(event.target.value)} /></div></div>
    </section>
    <section className="content-card movements-list"><div className="section-heading"><h2>Movimientos del periodo</h2><span className="results-count">{filteredMovements.length} resultados</span></div>
      {filteredMovements.length === 0 ? <p className="empty-state">No hay movimientos entre las fechas seleccionadas.</p> : filteredMovements.map((movement) => <div className="movement" key={movement.id}><div className={`movement-icon ${movement.iconClass}`}>{movement.icon}</div><div><strong>{movement.description}</strong><small>{new Date(`${movement.date}T12:00:00`).toLocaleDateString('es-ES')} · {movement.category}</small></div><b className={movement.amount >= 0 ? 'positive' : 'negative'}>{formatAmount(movement.amount)}</b></div>)}
    </section>
    {showForm && <div className="modal-backdrop" onMouseDown={() => setShowForm(false)}><section className="movement-modal" role="dialog" aria-modal="true" aria-labelledby="new-movement-title" onMouseDown={(event) => event.stopPropagation()}><div className="modal-heading"><h2 id="new-movement-title">Nuevo movimiento</h2><button className="modal-close" onClick={() => setShowForm(false)} aria-label="Cerrar">×</button></div><form onSubmit={saveMovement}><label>Descripción<input value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Ej. Compra supermercado" required /></label><label>Importe<input type="text" inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0,00" required /></label><label>Fecha<input type="date" value={date} onChange={(event) => setDate(event.target.value)} required /></label><label>Categoría<select value={category} onChange={(event) => setCategory(event.target.value)} required disabled={categories.length === 0}><option value="">{categories.length === 0 ? 'No hay categorías creadas' : 'Selecciona una categoría'}</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>{categories.length === 0 && <small className="category-help">Crea primero una categoría desde el menú.</small>}<div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowForm(false)}>Cancelar</button><button type="submit" className="primary-button" disabled={!category}>Guardar</button></div></form></section></div>}
  </>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  return <div className="app-shell">
    {menuOpen && <button className="backdrop" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)} />}
    <aside className={`sidebar ${menuOpen ? 'open' : ''}`}><div className="brand"><div className="brand-mark">M</div><span>mi gestor</span><button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú"><X size={21} /></button></div><nav>{menuItems.map((item) => <MenuItem key={item.to} {...item} />)}</nav><div className="sidebar-footer"><MenuItem label="Configuración" icon={<Settings size={20} />} to="/configuracion" /></div></aside>
    <main className="main-content"><header className="topbar"><button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Abrir menú"><Menu size={24} /></button><span className="mobile-title">mi gestor</span></header><div className="page-content"><Outlet /></div></main>
  </div>
}

export default App
