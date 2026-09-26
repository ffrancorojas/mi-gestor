import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import {
  CloseButton,
  CurrencyInput,
  DatePicker,
  Dropdown,
  ModalHeader,
  SaveCancelButtons,
  TextInput,
} from '@/components/common'
import type { MovementModalProps } from './MovementModal.types'
import { useMovementModal } from './useMovementModal'

export function MovementModal(props: MovementModalProps) {
  const { isOpen } = props
  const {
    description,
    setDescription,
    amount,
    setAmount,
    date,
    setDate,
    category,
    setCategory,
    categories,
    categoryOptions,
    handleClose,
    handleSubmit,
  } = useMovementModal(props)

  if (!isOpen) return null

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="new-movement-title"
      fullWidth
      maxWidth="xs"
      scroll="paper"
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ position: 'relative' }}>
        <Box sx={{ position: 'absolute', zIndex: 1, top: 2, right: 2 }}>
          <CloseButton onClick={handleClose} />
        </Box>
        <ModalHeader title="Nuevo movimiento" titleId="new-movement-title" />

        <DialogContent sx={{ display: 'grid', gap: 3, px: 6, pt: '0.25rem !important', pb: 5 }}>
          <TextInput
            id="movement-description"
            label="Descripción"
            value={description}
            placeholder="Ej. Compra supermercado"
            required
            onChange={setDescription}
          />
          <CurrencyInput
            id="movement-amount"
            label="Importe"
            value={amount}
            required
            onChange={setAmount}
          />
          <DatePicker id="movement-date" label="Fecha" value={date} required onChange={setDate} />
          <Dropdown
            id="movement-category"
            label="Categoría"
            value={category}
            options={categoryOptions}
            placeholder="Selecciona una categoría"
            emptyMessage="No hay categorías creadas"
            disabled={categories.length === 0}
            required
            onChange={setCategory}
          />
          {categories.length === 0 && (
            <Typography variant="caption" sx={{ color: 'app.textSoft' }}>
              Crea primero una categoría desde el menú.
            </Typography>
          )}

          <SaveCancelButtons onCancel={handleClose} saveDisabled={categories.length === 0} />
        </DialogContent>
      </Box>
    </Dialog>
  )
}
