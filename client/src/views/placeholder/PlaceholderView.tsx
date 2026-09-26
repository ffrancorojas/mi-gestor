import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { PlaceholderViewProps } from './PlaceholderView.types'

export function PlaceholderView({ title }: PlaceholderViewProps) {
  const { pathname } = useLocation()
  const pageTitle = title ?? (pathname.slice(1).replace('-', ' ') || 'Página')
  return (
    <Box component="section" sx={{ pt: 4 }}>
      <Typography
        variant="overline"
        sx={{ color: 'app.textSoft', fontWeight: 700, letterSpacing: '0.08em' }}
      >
        Próximamente
      </Typography>
      <Typography
        component="h1"
        sx={{
          my: 2,
          fontSize: '2.25rem',
          fontWeight: 800,
          letterSpacing: '-0.05em',
          textTransform: 'capitalize',
        }}
      >
        {pageTitle}
      </Typography>
      <Typography color="text.secondary">
        Esta pantalla ya tiene su ruta preparada para conectarla con el backend.
      </Typography>
    </Box>
  )
}
