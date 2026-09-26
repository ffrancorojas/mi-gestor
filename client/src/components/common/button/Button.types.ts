export type ButtonVariant = 'primary' | 'secondary'

export type ButtonProps = {
  text: string
  variant: ButtonVariant
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
}
