import { BarChart3, Home, Repeat2, Settings, Tag, WalletCards } from 'lucide-react'
import type { NavigationItem } from './navigation.types'

export const navigationItems: NavigationItem[] = [
  { label: 'Resumen', icon: Home, to: '/' },
  { label: 'Movimientos', icon: WalletCards, to: '/movimientos' },
  { label: 'Cuentas', icon: WalletCards, to: '/cuentas' },
  { label: 'Recurrentes', icon: Repeat2, to: '/recurrentes' },
  { label: 'Categorías', icon: Tag, to: '/categorias' },
  { label: 'Informes', icon: BarChart3, to: '/informes' },
]

export const settingsNavigationItem: NavigationItem = {
  label: 'Configuración',
  icon: Settings,
  to: '/configuracion',
}
