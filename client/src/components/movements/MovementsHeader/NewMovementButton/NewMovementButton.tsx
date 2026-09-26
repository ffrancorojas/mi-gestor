import Button from '@mui/material/Button'
import { Plus } from 'lucide-react'
import type { NewMovementButtonProps } from './NewMovementButton.types'

export function NewMovementButton({ onClick }: NewMovementButtonProps) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
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
      Nuevo movimiento
    </Button>
  )
}
