import type { CloseButtonProps } from './CloseButton.types'
import './CloseButton.scss'

export function CloseButton({ onClick, ariaLabel = 'Cerrar' }: CloseButtonProps) {
  return (
    <button type="button" className="close-button" onClick={onClick} aria-label={ariaLabel}>
      ×
    </button>
  )
}
