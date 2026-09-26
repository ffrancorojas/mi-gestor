import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Plus } from 'lucide-react'
import type { CategoriesHeaderProps } from './CategoriesHeader.types'

export function CategoriesHeader({ onOpenModal }: CategoriesHeaderProps) {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 6,
        '@media (max-width:44rem)': { alignItems: 'flex-start' },
      }}
    >
      <Box>
        <Typography
          variant="overline"
          sx={{ color: 'app.textSoft', fontWeight: 700, letterSpacing: '0.08em' }}
        >
          Organización
        </Typography>
        <Typography
          variant="h1"
          sx={{ mt: 2, '@media (max-width:44rem)': { fontSize: '1.75rem' } }}
        >
          Categorías
        </Typography>
      </Box>
      <Button
        variant="contained"
        onClick={onOpenModal}
        startIcon={<Plus size={17} />}
        sx={{
          px: 4,
          py: 3,
          fontSize: '0.75rem',
          boxShadow: '0 0.5rem 1rem rgba(101, 89, 238, 0.18)',
          '@media (max-width:44rem)': {
            minWidth: '2.75rem',
            px: 3,
            fontSize: 0,
            '& .MuiButton-startIcon': { m: 0 },
          },
        }}
      >
        Añadir categoría
      </Button>
    </Box>
  )
}
