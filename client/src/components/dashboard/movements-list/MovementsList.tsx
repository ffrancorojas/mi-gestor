import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { NavLink } from 'react-router-dom'
import { MovementItem } from './movement-item'
import type { MovementsListProps } from './MovementsList.types'

export function MovementsList({ movements }: MovementsListProps) {
  return (
    <Paper component="section" variant="outlined" sx={{ p: 6, mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h2">Últimos movimientos</Typography>
        <Link component={NavLink} to="/movimientos" sx={{ fontSize: '0.75rem', fontWeight: 700 }}>
          Ver todos
        </Link>
      </Box>
      {movements.length === 0 ? (
        <Typography sx={{ py: 6, color: 'app.textSoft', fontSize: '0.875rem' }}>
          Todavía no hay movimientos.
        </Typography>
      ) : (
        movements.map((movement) => (
          <MovementItem key={movement.description + movement.detail} {...movement} />
        ))
      )}
    </Paper>
  )
}
