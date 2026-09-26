import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { createCategory } from '@/api'
import { CategoryList } from '@/components/category-list'
import { CategoriesHeader, CategoryModal } from '@/components'
import { useCategories } from './useCategories'

export function CategoriesView() {
  const { categories, isLoading, error, setCategories } = useCategories()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSaveCategory = async (name: string) => {
    const category = await createCategory(name)
    setCategories((current) => [...current, category])
  }

  return (
    <>
      <CategoriesHeader onOpenModal={() => setIsModalOpen(true)} />
      <Paper component="section" variant="outlined" sx={{ p: 6 }}>
        {isLoading ? (
          <Typography sx={{ py: 8, textAlign: 'center' }}>Cargando categorías...</Typography>
        ) : error ? (
          <Typography sx={{ py: 8, color: 'error.main', textAlign: 'center' }}>{error}</Typography>
        ) : (
          <CategoryList categories={categories} />
        )}
      </Paper>
      <CategoryModal
        isOpen={isModalOpen}
        categories={categories}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
      />
    </>
  )
}
