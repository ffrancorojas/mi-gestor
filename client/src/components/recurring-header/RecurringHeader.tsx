import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Plus } from 'lucide-react'
import { Button } from '@/components/common'
import type { RecurringHeaderProps } from './RecurringHeader.types'

export function RecurringHeader({ onOpenModal }: RecurringHeaderProps) {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 4,
        mb: 6,
        '@media (max-width:44rem)': { alignItems: 'stretch', flexDirection: 'column' },
      }}
    >
      <Box>
        <Typography variant="h1">Movimientos recurrentes</Typography>
        <Typography sx={{ mt: 2, color: 'app.textSoft' }}>
          Consulta y administra los gastos que se repiten cada mes.
        </Typography>
      </Box>
      <Button
        text="Añadir pago recurrente"
        variant="primary"
        startIcon={<Plus size={18} />}
        onClick={onOpenModal}
      />
    </Box>
  )
}
