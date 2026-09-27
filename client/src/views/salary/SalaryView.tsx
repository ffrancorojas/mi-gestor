import Typography from '@mui/material/Typography'
import { SalaryForm } from '@/components'
import { useSalaryView } from './useSalaryView'

export function SalaryView() {
  const salary = useSalaryView()

  return (
    <>
      <Typography variant="h1">Nómina mensual</Typography>
      <Typography sx={{ mt: 2, mb: 6, color: 'app.textSoft' }}>
        Guarda el importe recibido en cada mes para incluirlo en tu resumen.
      </Typography>
      <SalaryForm
        month={salary.month}
        amount={salary.amount}
        isLoading={salary.isLoading}
        isSaving={salary.isSaving}
        error={salary.error}
        successMessage={salary.successMessage}
        onMonthChange={salary.setMonth}
        onAmountChange={salary.setAmount}
        onSubmit={() => void salary.handleSave()}
      />
    </>
  )
}
