import type { Category } from '@/api'

export type CategoryModalProps = {
  isOpen: boolean
  categories: Category[]
  onClose: () => void
  onSave: (name: string) => Promise<void>
}
