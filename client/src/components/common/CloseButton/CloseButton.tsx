import IconButton from '@mui/material/IconButton'
import { X } from 'lucide-react'
import type { CloseButtonProps } from './CloseButton.types'

export function CloseButton({ onClick, ariaLabel = 'Cerrar' }: CloseButtonProps) {
  return (
    <IconButton
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      size="small"
      sx={{ color: 'app.textSoft' }}
    >
      <X size={20} />
    </IconButton>
  )
}
