import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { MovementsFilters, ReportsHeader } from '@/components'
import { useReportsView } from './useReportsView'

export function ReportsView() {
  const reports = useReportsView()

  return (
    <>
      <ReportsHeader
        isExporting={reports.isExporting}
        disabled={!reports.from || !reports.to || reports.from > reports.to}
        onExport={() => void reports.handleExport()}
      />
      <MovementsFilters
        from={reports.from}
        to={reports.to}
        onFromChange={reports.setFrom}
        onToChange={reports.setTo}
      />
      {reports.error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {reports.error}
        </Alert>
      )}
      <Paper variant="outlined" sx={{ p: 6 }}>
        <Typography variant="h2">Contenido del Excel</Typography>
        <Typography sx={{ mt: 2, color: 'app.textSoft' }}>
          Fecha, tipo, descripción, categoría, cuenta, importe, recurrencia, notas y origen.
        </Typography>
      </Paper>
    </>
  )
}
