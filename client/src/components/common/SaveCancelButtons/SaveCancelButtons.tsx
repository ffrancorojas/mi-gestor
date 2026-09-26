import { Button } from '../Button'
import type { SaveCancelButtonsProps } from './SaveCancelButtons.types'
import './SaveCancelButtons.scss'

export function SaveCancelButtons({
  onCancel,
  saveDisabled = false,
  saveText = 'Guardar',
  cancelText = 'Cancelar',
}: SaveCancelButtonsProps) {
  return (
    <div className="save-cancel-buttons">
      <Button text={cancelText} variant="secondary" onClick={onCancel} />
      <Button text={saveText} type="submit" variant="primary" disabled={saveDisabled} />
    </div>
  )
}
