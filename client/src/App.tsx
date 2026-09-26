import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { BarChart3, CreditCard, Home, Menu, Repeat2, Settings, WalletCards, X } from 'lucide-react'
import './App.css'

type MenuItemProps = { label: string; icon: React.ReactNode; to: string }

const menuItems: MenuItemProps[] = [
  { label: 'Resumen', icon: <Home size={20} />, to: '/' },
  { label: 'Movimientos', icon: <CreditCard size={20} />, to: '/movimientos' },
  { label: 'Cuentas', icon: <WalletCards size={20} />, to: '/cuentas' },
  { label: 'Recurrentes', icon: <Repeat2 size={20} />, to: '/recurrentes' },
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  return <div className="app-shell">
    {menuOpen && <button className="backdrop" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)} />}
    <aside className={`sidebar ${menuOpen ? 'open' : ''}`}><div className="brand"><div className="brand-mark">M</div><span>mi gestor</span><button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú"><X size={21} /></button></div><nav>{menuItems.map((item) => <MenuItem key={item.to} {...item} />)}</nav><div className="sidebar-footer"><MenuItem label="Configuración" icon={<Settings size={20} />} to="/configuracion" /></div></aside>
    <main className="main-content"><header className="topbar"><button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Abrir menú"><Menu size={24} /></button><span className="mobile-title">mi gestor</span></header><div className="page-content"><Outlet /></div></main>
  </div>
}

export default App
