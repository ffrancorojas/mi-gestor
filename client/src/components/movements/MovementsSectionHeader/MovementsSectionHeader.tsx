import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { MovementsSectionHeaderProps } from './MovementsSectionHeader.types'

export function MovementsSectionHeader({ resultCount }: MovementsSectionHeaderProps) {
  const resultLabel = `${resultCount} ${resultCount === 1 ? 'resultado' : 'resultados'}`

  return (
    <Box
      component="header"
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}
    >
      <Typography variant="h2">Movimientos del periodo</Typography>
      <Typography variant="caption" sx={{ color: 'app.textSoft' }}>
        {resultLabel}
      </Typography>
    </Box>
  )
}
