import { NavLink } from 'react-router-dom'
import type { MenuItemProps } from './MenuItem.types'
import './MenuItem.scss'

export function MenuItem({ label, icon, to }: MenuItemProps) {
  return (
    <NavLink to={to} className={({ isActive }) => 'menu-item ' + (isActive ? 'active' : '')}>
      {icon}
      <span>{label}</span>
    </NavLink>
  )
}
