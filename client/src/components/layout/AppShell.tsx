import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { NavigationMenuItem, navigationItems } from '@/components'

const drawerWidth = '15.5rem'

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width:44rem)')
  const closeMenu = () => setMenuOpen(false)

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, pb: 8 }}>
        <Box
          sx={{
            display: 'grid',
            placeItems: 'center',
            width: '2rem',
            height: '2rem',
            borderRadius: 3,
            backgroundColor: 'primary.light',
            color: 'primary.main',
            fontWeight: 700,
          }}
        >
          M
        </Box>
        <Typography sx={{ fontSize: '1.25rem', fontWeight: 750, letterSpacing: '-0.04em' }}>
          mi gestor
        </Typography>
        {isMobile && (
          <IconButton
            sx={{ ml: 'auto', color: 'primary.main' }}
            onClick={closeMenu}
            aria-label="Cerrar menú"
          >
            <X size={21} />
          </IconButton>
        )}
      </Box>

      <List component="nav" disablePadding>
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.to} {...item} onNavigate={closeMenu} />
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {isMobile && (
        <AppBar
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'primary.light' }}
        >
          <Toolbar sx={{ minHeight: '4rem !important', gap: 3, px: 5 }}>
            <IconButton
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              edge="start"
              sx={{ color: 'primary.main' }}
            >
              <Menu size={24} />
            </IconButton>
            <Typography sx={{ fontWeight: 750, letterSpacing: '-0.04em' }}>mi gestor</Typography>
          </Toolbar>
        </AppBar>
      )}

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? menuOpen : true}
        onClose={closeMenu}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: isMobile ? 0 : drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderColor: 'divider',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
        {isMobile && <Toolbar sx={{ minHeight: '4rem !important' }} />}
        <Box
          sx={{
            maxWidth: '57.5rem',
            mx: 'auto',
            px: 8,
            pt: 12,
            pb: 20,
            '@media (max-width:44rem)': {
              px: 5,
              pt: 8,
              pb: 12,
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
