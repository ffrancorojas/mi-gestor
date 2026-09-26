import type { NavigationItem } from '../navigation.types'

export type NavigationMenuItemProps = NavigationItem & {
  onNavigate?: () => void
}
