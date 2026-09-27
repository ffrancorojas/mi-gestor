import { useCallback, useState } from 'react'
import { getReportRows } from '@/api'
import { getCurrentDate, getFirstDayOfCurrentMonth } from '@/tools'
import { exportReportToExcel } from '@/tools/excel.tools'

export function useReportsView() {
  const [from, setFrom] = useState(getFirstDayOfCurrentMonth)
  const [to, setTo] = useState(getCurrentDate)
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState('')

  const handleExport = useCallback(async () => {
    if (!from || !to || from > to) {
      setError('Selecciona un rango de fechas válido.')
      return
    }

    setIsExporting(true)
    setError('')

    try {
      const rows = await getReportRows(from, to)

      if (rows.length === 0) {
        setError('No hay datos para exportar en el periodo seleccionado.')
        return
      }

      await exportReportToExcel(rows, from, to)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'No se pudo generar el informe.')
    } finally {
      setIsExporting(false)
    }
  }, [from, to])

  return {
    from,
    setFrom,
    to,
    setTo,
    isExporting,
    error,
    handleExport,
  }
}
