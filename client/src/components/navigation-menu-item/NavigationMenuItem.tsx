import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { NavLink } from 'react-router-dom'
import type { NavigationMenuItemProps } from './NavigationMenuItem.types'

export function NavigationMenuItem({ label, icon: Icon, to, onNavigate }: NavigationMenuItemProps) {
  return (
    <ListItemButton
      component={NavLink}
      to={to}
      onClick={onNavigate}
      sx={{
        gap: 3,
        px: 3,
        py: 3,
        my: 1,
        borderRadius: 3,
        color: 'text.secondary',
        '&:hover, &.active': {
          color: 'primary.main',
          backgroundColor: 'primary.light',
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: 0, color: 'inherit' }}>
        <Icon size={20} />
      </ListItemIcon>
      <ListItemText
        primary={label}
        slotProps={{ primary: { sx: { fontSize: '0.875rem', fontWeight: 600 } } }}
      />
    </ListItemButton>
  )
}
