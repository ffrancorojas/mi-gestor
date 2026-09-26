export type ConfirmationDialogProps = {
  open: boolean
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  onClose: () => void
  onConfirm: () => void
}
