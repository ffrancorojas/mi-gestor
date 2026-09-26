import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { NavigationMenuItem, navigationItems, settingsNavigationItem } from '../../navigation'
import './AppShell.scss'

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="app-shell">
      {menuOpen && (
        <button className="backdrop" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)} />
      )}
      <aside className={'sidebar ' + (menuOpen ? 'open' : '')}>
        <div className="brand">
          <div className="brand-mark">M</div>
          <span>mi gestor</span>
          <button
            className="close-menu"
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={21} />
          </button>
        </div>
        <nav>
          {navigationItems.map((item) => (
            <NavigationMenuItem key={item.to} {...item} />
          ))}
        </nav>
        <div className="sidebar-footer">
          <NavigationMenuItem {...settingsNavigationItem} />
        </div>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Abrir menú">
            <Menu size={24} />
          </button>
          <span className="mobile-title">mi gestor</span>
        </header>
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
