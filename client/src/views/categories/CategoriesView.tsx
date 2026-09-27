import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { createCategory, updateCategory, type Category } from '@/api'
import { CategoryList } from '@/components/category-list'
import { CategoriesHeader, CategoryModal } from '@/components'
import { useCategories } from './useCategories'

export function CategoriesView() {
  const { categories, isLoading, error, setCategories } = useCategories()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const handleSaveCategory = async (name: string) => {
    if (selectedCategory) {
      const category = await updateCategory(selectedCategory.id, name)
      setCategories((current) =>
        current.map((currentCategory) =>
          currentCategory.id === category.id ? category : currentCategory,
        ),
      )
      return
    }

    const category = await createCategory(name)
    setCategories((current) => [...current, category])
  }

  const handleOpenCreateModal = () => {
    setSelectedCategory(null)
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (category: Category) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCategory(null)
  }

  return (
    <>
      <CategoriesHeader onOpenModal={handleOpenCreateModal} />
      <Paper component="section" variant="outlined" sx={{ p: 6 }}>
        {isLoading ? (
          <Typography sx={{ py: 8, textAlign: 'center' }}>Cargando categorías...</Typography>
        ) : error ? (
          <Typography sx={{ py: 8, color: 'error.main', textAlign: 'center' }}>{error}</Typography>
        ) : (
          <CategoryList categories={categories} onEdit={handleOpenEditModal} />
        )}
      </Paper>
      <CategoryModal
        key={selectedCategory?.id ?? 'new-category'}
        isOpen={isModalOpen}
        categories={categories}
        category={selectedCategory}
        onClose={handleCloseModal}
        onSave={handleSaveCategory}
      />
    </>
  )
}
