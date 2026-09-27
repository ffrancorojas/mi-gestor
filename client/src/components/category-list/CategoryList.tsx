import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { CategoryItem } from './components'
import type { CategoryListProps } from './CategoryList.types'

export function CategoryList({ categories, onEdit }: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <Typography sx={{ py: 8, color: 'app.textSoft', textAlign: 'center' }}>
        Todavía no hay categorías creadas.
      </Typography>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} onEdit={onEdit} />
      ))}
    </Box>
  )
}
