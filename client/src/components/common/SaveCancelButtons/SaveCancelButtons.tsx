import DialogActions from '@mui/material/DialogActions'
import { Button } from '../Button'
import type { SaveCancelButtonsProps } from './SaveCancelButtons.types'

export function SaveCancelButtons({
  onCancel,
  saveDisabled = false,
  saveText = 'Guardar',
  cancelText = 'Cancelar',
}: SaveCancelButtonsProps) {
  return (
    <DialogActions sx={{ gap: 2, px: 0, pt: 2, pb: 0 }}>
      <Button text={cancelText} variant="secondary" onClick={onCancel} />
      <Button text={saveText} type="submit" variant="primary" disabled={saveDisabled} />
    </DialogActions>
  )
}
