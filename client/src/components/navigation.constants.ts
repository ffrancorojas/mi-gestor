import { BarChart3, Banknote, Home, Repeat2, Tag, WalletCards } from 'lucide-react'
import type { NavigationItem } from './navigation.types'

export const navigationItems: NavigationItem[] = [
  { label: 'Resumen', icon: Home, to: '/' },
  { label: 'Movimientos', icon: WalletCards, to: '/movimientos' },
  { label: 'Nómina', icon: Banknote, to: '/nomina' },
  { label: 'Recurrentes', icon: Repeat2, to: '/recurrentes' },
  { label: 'Categorías', icon: Tag, to: '/categorias' },
  { label: 'Informes', icon: BarChart3, to: '/informes' },
]
