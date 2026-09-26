import {
  CurrencyInput,
  DatePicker,
  Dropdown,
  ModalHeader,
  SaveCancelButtons,
  SmallText,
  TextInput,
} from '@/components/common'
import type { MovementModalProps } from './MovementModal.types'
import { useMovementModal } from './useMovementModal'
import './MovementModal.scss'

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
    <div className="movement-modal-backdrop" onMouseDown={handleClose}>
      <section
        className="movement-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-movement-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <ModalHeader title="Nuevo movimiento" titleId="new-movement-title" onClose={handleClose} />

        <form className="movement-modal-form" onSubmit={handleSubmit}>
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
            <SmallText
              className="movement-modal-category-help"
              text="Crea primero una categoría desde el menú."
            />
          )}

          <SaveCancelButtons onCancel={handleClose} saveDisabled={categories.length === 0} />
        </form>
      </section>
    </div>
  )
}
