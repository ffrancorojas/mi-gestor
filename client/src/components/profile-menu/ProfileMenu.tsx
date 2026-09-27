import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { LogOut } from 'lucide-react'

type ProfileMenuProps = {
  displayName: string | null | undefined
  email: string | null | undefined
  onSignOut: () => void | Promise<void>
}

export function ProfileMenu({ displayName: rawDisplayName, email, onSignOut }: ProfileMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const displayName = rawDisplayName?.trim() ?? ''
  const initials = displayName
    ? displayName
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
    : (email?.slice(0, 2).toUpperCase() ?? '??')

  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <IconButton
        aria-label="Abrir perfil"
        aria-controls={anchorEl ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{ p: 0 }}
      >
        <Avatar
          sx={{
            width: '2.5rem',
            height: '2.5rem',
            color: 'primary.main',
            backgroundColor: 'app.primaryLight',
            fontSize: '0.875rem',
            fontWeight: 800,
          }}
        >
          {initials}
        </Avatar>
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => {
            handleClose()
            void onSignOut()
          }}
        >
          <LogOut size={18} style={{ marginRight: '0.5rem' }} />
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  )
}
