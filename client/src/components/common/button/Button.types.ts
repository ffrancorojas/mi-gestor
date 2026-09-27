import type { ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary'

export type ButtonProps = {
  text: string
  variant: ButtonVariant
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  startIcon?: ReactNode
  onClick?: () => void
}
