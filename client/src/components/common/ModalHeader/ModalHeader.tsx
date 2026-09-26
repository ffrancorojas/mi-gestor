import DialogTitle from '@mui/material/DialogTitle'
import { CloseButton } from '../CloseButton'
import type { ModalHeaderProps } from './ModalHeader.types'

export function ModalHeader({ title, titleId, onClose }: ModalHeaderProps) {
  return (
    <DialogTitle
      id={titleId}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 3,
        px: 6,
        py: 5,
        fontSize: '1.25rem',
        fontWeight: 800,
      }}
    >
      {title}
      <CloseButton onClick={onClose} />
    </DialogTitle>
  )
}
