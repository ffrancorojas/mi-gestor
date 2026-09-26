import { CloseButton } from '../CloseButton'
import type { ModalHeaderProps } from './ModalHeader.types'
import './ModalHeader.scss'

export function ModalHeader({ title, titleId, onClose }: ModalHeaderProps) {
  return (
    <header className="modal-header">
      <h2 id={titleId}>{title}</h2>
      <CloseButton onClick={onClose} />
    </header>
  )
}
