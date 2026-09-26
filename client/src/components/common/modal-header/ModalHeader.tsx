import DialogTitle from '@mui/material/DialogTitle'
import type { ModalHeaderProps } from './ModalHeader.types'

export function ModalHeader({ title, titleId }: ModalHeaderProps) {
  return (
    <DialogTitle
      sx={{
        px: 6,
        pt: 6,
        pb: 4,
        pr: 14,
        fontSize: '1.25rem',
        fontWeight: 800,
      }}
    >
      <span id={titleId}>{title}</span>
    </DialogTitle>
  )
}
