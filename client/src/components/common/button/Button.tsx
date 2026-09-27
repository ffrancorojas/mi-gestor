import MuiButton from '@mui/material/Button'
import type { ButtonProps } from './Button.types'

export function Button({
  text,
  variant,
  type = 'button',
  disabled = false,
  startIcon,
  onClick,
}: ButtonProps) {
  return (
    <MuiButton
      type={type}
      variant={variant === 'primary' ? 'contained' : 'text'}
      disabled={disabled}
      startIcon={startIcon}
      onClick={onClick}
      sx={
        variant === 'secondary'
          ? {
              color: 'text.primary',
              backgroundColor: 'app.surfaceMuted',
              '&:hover': { backgroundColor: 'divider' },
            }
          : undefined
      }
    >
      {text}
    </MuiButton>
  )
}
