import type { ButtonProps } from './Button.types'
import './Button.scss'

export function Button({ text, variant, type = 'button', disabled = false, onClick }: ButtonProps) {
  return (
    <button
      type={type}
      className={`button button--${variant}`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
