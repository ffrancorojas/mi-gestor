import type { ReportRow } from '@/api'
import type { SheetData } from 'write-excel-file/browser'

const getDownloadFileName = (from: string, to: string) => `mi-gestor-movimientos-${from}-${to}.xlsx`

const headerCell = (value: string) => ({
  value,
  fontWeight: 'bold' as const,
  textColor: '#ffffff',
  backgroundColor: 'rgba(218, 69, 255, 1)',
  alignVertical: 'center' as const,
  height: 24,
})

export async function exportReportToExcel(rows: ReportRow[], from: string, to: string) {
  const { default: writeExcelFile } = await import('write-excel-file/browser')
  const sheetData: SheetData = [
    [
      headerCell('Fecha'),
      headerCell('Tipo'),
      headerCell('Descripción'),
      headerCell('Categoría'),
      headerCell('Cuenta'),
      headerCell('Importe'),
      headerCell('Recurrente'),
      headerCell('Notas'),
      headerCell('Origen'),
    ],
    ...rows.map((row) => {
      const [year, month, day] = row.date.slice(0, 10).split('-').map(Number)
      const amount = row.amountCents / 100

      return [
        { value: new Date(year, month - 1, day), type: Date, format: 'dd/mm/yyyy' },
        row.kind === 'INCOME' ? 'Ingreso' : 'Gasto',
        row.description,
        row.category,
        row.account ?? '',
        {
          value: row.kind === 'EXPENSE' ? -Math.abs(amount) : Math.abs(amount),
          type: Number,
          format: '#,##0.00 [$€-es-ES]',
        },
        row.recurring ? 'Sí' : 'No',
        row.notes ?? '',
        row.source === 'SALARY' ? 'Nómina mensual' : 'Movimiento',
      ]
    }),
  ]

  await writeExcelFile(
    sheetData,
    {
      sheet: 'Movimientos',
      columns: [
        { width: 14 },
        { width: 14 },
        { width: 30 },
        { width: 22 },
        { width: 20 },
        { width: 16 },
        { width: 14 },
        { width: 36 },
        { width: 16 },
      ],
      stickyRowsCount: 1,
      showGridLines: false,
    },
    {
      fontFamily: 'Calibri',
    },
  ).toFile(getDownloadFileName(from, to))
}
