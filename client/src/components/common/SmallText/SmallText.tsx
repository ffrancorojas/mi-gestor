import type { SmallTextProps } from './SmallText.types'
import './SmallText.scss'

export function SmallText({ text, className = '' }: SmallTextProps) {
  return <small className={`small-text ${className}`.trim()}>{text}</small>
}
