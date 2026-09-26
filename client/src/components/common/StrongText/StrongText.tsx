import type { StrongTextProps } from './StrongText.types'
import './StrongText.scss'

export function StrongText({ text, className = '' }: StrongTextProps) {
  return <strong className={`strong-text ${className}`.trim()}>{text}</strong>
}
