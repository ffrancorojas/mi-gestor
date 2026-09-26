import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import type { BalanceCardProps } from './BalanceCard.types'

export function BalanceCard({ balance, variation }: BalanceCardProps) {
  return (
    <Paper
      component="section"
      elevation={0}
      sx={{
        p: '1.75rem 2rem',
        color: 'primary.contrastText',
        background: 'linear-gradient(120deg, #6559ee, #8479fa)',
        boxShadow: '0 0.75rem 1.75rem rgba(101, 89, 238, 0.2)',
        '@media (max-width:44rem)': { p: 6 },
      }}
    >
      <Typography sx={{ opacity: 0.78, fontSize: '0.875rem', fontWeight: 600 }}>
        Saldo total
      </Typography>
      <Typography
        component="strong"
        sx={{
          display: 'block',
          my: 2,
          fontSize: '2.25rem',
          fontWeight: 700,
          letterSpacing: '-0.05em',
          '@media (max-width:44rem)': { fontSize: '2rem' },
        }}
      >
        {balance}
      </Typography>
      <Box sx={{ fontSize: '0.75rem', opacity: 0.78 }}>
        <Box component="span" sx={{ color: 'app.balanceVariation', fontWeight: 800, mr: 1 }}>
          {variation}
        </Box>
        respecto al mes anterior
      </Box>
    </Paper>
  )
}
