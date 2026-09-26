import { NavLink } from 'react-router-dom'
import type { NavigationMenuItemProps } from './NavigationMenuItem.types'
import './NavigationMenuItem.scss'

export function NavigationMenuItem({ label, icon: Icon, to }: NavigationMenuItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 'navigation-menu-item ' + (isActive ? 'active' : '')}
    >
      <Icon size={20} />
      <span>{label}</span>
    </NavLink>
  )
}
