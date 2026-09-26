import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import type { CategoryListProps } from './CategoryList.types'

export function CategoryList({ categories }: CategoryListProps) {
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
        <Chip key={category.id} label={category.name} sx={{ px: 1, py: 3 }} />
      ))}
    </Box>
  )
}
