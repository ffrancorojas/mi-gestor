import Chip from '@mui/material/Chip'
import { Pencil } from 'lucide-react'
import type { CategoryItemProps } from './CategoryItem.types'

export function CategoryItem({ category, onEdit }: CategoryItemProps) {
  return (
    <Chip
      component="button"
      type="button"
      icon={<Pencil size={15} />}
      label={category.name}
      onClick={() => onEdit(category)}
      aria-label={`Editar categoría ${category.name}`}
      sx={{ px: 1, py: 3 }}
    />
  )
}
