import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Download } from 'lucide-react'
import { Button } from '@/components/common'
import type { ReportsHeaderProps } from './ReportsHeader.types'

export function ReportsHeader({ isExporting, disabled, onExport }: ReportsHeaderProps) {
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
        <Typography variant="h1">Informes</Typography>
        <Typography sx={{ mt: 2, color: 'app.textSoft' }}>
          Exporta tus ingresos y gastos dentro del periodo seleccionado.
        </Typography>
      </Box>
      <Button
        text={isExporting ? 'Generando...' : 'Exportar a Excel'}
        variant="primary"
        disabled={disabled || isExporting}
        startIcon={<Download size={18} />}
        onClick={onExport}
      />
    </Box>
  )
}
