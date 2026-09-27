import type { Category } from '@/api'

export type CategoryItemProps = {
  category: Category
  onEdit: (category: Category) => void
}
