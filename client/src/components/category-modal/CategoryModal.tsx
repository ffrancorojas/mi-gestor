import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import { CloseButton, ModalHeader, SaveCancelButtons, TextInput } from '@/components/common'
import type { CategoryModalProps } from './CategoryModal.types'
import { useCategoryModal } from './useCategoryModal'

export function CategoryModal({ isOpen, categories, onClose, onSave }: CategoryModalProps) {
  const { name, setName, error, clearError, handleClose, handleSubmit } = useCategoryModal({
    isOpen,
    categories,
    onClose,
    onSave,
  })

  if (!isOpen) return null

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="new-category-title"
        fullWidth
        maxWidth="xs"
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ position: 'relative' }}>
          <Box sx={{ position: 'absolute', zIndex: 1, top: 2, right: 2 }}>
            <CloseButton onClick={handleClose} />
          </Box>
          <ModalHeader title="Nueva categoría" titleId="new-category-title" />
          <DialogContent sx={{ display: 'grid', gap: 3, px: 6, pt: '0.25rem !important', pb: 5 }}>
            <TextInput
              id="category-name"
              label="Nombre"
              value={name}
              placeholder="Ej. Alimentación"
              required
              onChange={setName}
            />
            <SaveCancelButtons onCancel={handleClose} />
          </DialogContent>
        </Box>
      </Dialog>
      <Dialog open={Boolean(error)} onClose={clearError} aria-labelledby="category-error-title">
        <DialogTitle id="category-error-title">No se puede guardar</DialogTitle>
        <DialogContent>
          <Alert severity="error">{error}</Alert>
          <Typography sx={{ mt: 2, color: 'app.textSoft', fontSize: '0.875rem' }}>
            Corrige el nombre para continuar.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={clearError} variant="contained" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
