import type { Category } from '@/api'

export type CategoryModalProps = {
  isOpen: boolean
  categories: Category[]
  category?: Category | null
  onClose: () => void
  onSave: (name: string) => Promise<void>
}
