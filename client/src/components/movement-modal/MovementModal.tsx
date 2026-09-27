import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
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
    categoryId,
    setCategoryId,
    isRecurring,
    setIsRecurring,
    includeCurrentMonth,
    setIncludeCurrentMonth,
    currentMonthDay,
    setCurrentMonthDay,
    categories,
    categoryOptions,
    error,
    isSubmitting,
    recurringMode,
    editingMode,
    minimumDate,
    handleClose,
    handleSubmit,
  } = useMovementModal(props)

  if (!isOpen) return null

  const title = editingMode
    ? 'Editar movimiento'
    : recurringMode
      ? 'Nuevo pago recurrente'
      : 'Nuevo movimiento'

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="movement-modal-title"
      fullWidth
      maxWidth="xs"
      scroll="paper"
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ position: 'relative' }}>
        <Box sx={{ position: 'absolute', zIndex: 1, top: 2, right: 2 }}>
          <CloseButton onClick={handleClose} />
        </Box>
        <ModalHeader title={title} titleId="movement-modal-title" />

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
          <DatePicker
            id="movement-date"
            label={recurringMode ? 'Fecha habitual desde el próximo mes' : 'Fecha'}
            value={date}
            min={minimumDate}
            required
            onChange={setDate}
          />
          <Dropdown
            id="movement-category"
            label="Categoría"
            value={categoryId}
            options={categoryOptions}
            placeholder="Selecciona una categoría"
            emptyMessage="No hay categorías creadas"
            disabled={categories.length === 0}
            required
            onChange={setCategoryId}
          />
          {categories.length === 0 && (
            <Typography variant="caption" sx={{ color: 'app.textSoft' }}>
              Crea primero una categoría desde el menú.
            </Typography>
          )}

          {!editingMode && (
            <FormControlLabel
              control={
                <Switch
                  checked={isRecurring}
                  disabled={recurringMode}
                  onChange={(event) => setIsRecurring(event.target.checked)}
                />
              }
              label="Repetir cada mes"
              sx={{ ml: 0, color: 'app.textSoft' }}
            />
          )}

          {editingMode && isRecurring && (
            <Alert severity="info">
              Este cambio afecta solo a este movimiento, no al pago recurrente de los próximos
              meses.
            </Alert>
          )}

          {recurringMode && (
            <>
              <FormControlLabel
                control={
                  <Switch
                    checked={includeCurrentMonth}
                    onChange={(event) => setIncludeCurrentMonth(event.target.checked)}
                  />
                }
                label="Incluir también el gasto en el mes corriente"
                sx={{ ml: 0, color: 'app.textSoft' }}
              />
              {includeCurrentMonth && (
                <TextInput
                  id="current-month-day"
                  label="Día del pago este mes"
                  value={currentMonthDay}
                  inputMode="numeric"
                  placeholder="1-31"
                  required
                  onChange={setCurrentMonthDay}
                />
              )}
            </>
          )}

          {error && <Alert severity="error">{error}</Alert>}

          <SaveCancelButtons
            onCancel={handleClose}
            saveDisabled={categories.length === 0 || isSubmitting}
            saveText={isSubmitting ? 'Guardando...' : editingMode ? 'Guardar cambios' : 'Guardar'}
          />
        </DialogContent>
      </Box>
    </Dialog>
  )
}
