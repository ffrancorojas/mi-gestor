import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { NavLink } from 'react-router-dom'
import { MovementItem } from './MovementItem'
import type { MovementsListProps } from './MovementsList.types'

const defaultMovements = [
  {
    description: 'Restaurante',
    detail: 'Hoy, 14:32 · Alimentación',
    amount: '-32,50 €',
    tone: 'negative' as const,
    icon: '🍽️',
    iconClass: 'food',
  },
  {
    description: 'Alquiler',
    detail: '1 de septiembre · Vivienda',
    amount: '-850,00 €',
    tone: 'negative' as const,
    icon: '⌂',
    iconClass: 'home-icon',
  },
  {
    description: 'Nómina',
    detail: '1 de septiembre · Ingresos',
    amount: '+2.450,00 €',
    tone: 'positive' as const,
    icon: '↗',
    iconClass: 'salary',
  },
]

export function MovementsList({ movements = defaultMovements }: MovementsListProps) {
  return (
    <Paper component="section" variant="outlined" sx={{ p: 6, mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h2">Últimos movimientos</Typography>
        <Link component={NavLink} to="/movimientos" sx={{ fontSize: '0.75rem', fontWeight: 700 }}>
          Ver todos
        </Link>
      </Box>
      {movements.map((movement) => (
        <MovementItem key={movement.description + movement.detail} {...movement} />
      ))}
    </Paper>
  )
}
