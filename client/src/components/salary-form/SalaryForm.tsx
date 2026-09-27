import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Button, CurrencyInput, MonthPicker } from '@/components/common'
import type { SalaryFormProps } from './SalaryForm.types'

export function SalaryForm({
  month,
  amount,
  isLoading,
  isSaving,
  error,
  successMessage,
  onMonthChange,
  onAmountChange,
  onSubmit,
}: SalaryFormProps) {
  return (
    <Paper variant="outlined" sx={{ p: 6 }}>
      <Box
        component="form"
        sx={{ display: 'grid', gap: 4 }}
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <MonthPicker
          id="salary-month"
          label="Mes"
          value={month}
          required
          onChange={onMonthChange}
        />
        <CurrencyInput
          id="salary-amount"
          label="Importe de nómina"
          value={amount}
          required
          onChange={onAmountChange}
        />
        {isLoading && <Typography color="text.secondary">Cargando nómina...</Typography>}
        {error && <Alert severity="error">{error}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            text={isSaving ? 'Guardando...' : 'Guardar nómina'}
            type="submit"
            variant="primary"
            disabled={isLoading || isSaving}
          />
        </Box>
      </Box>
    </Paper>
  )
}
