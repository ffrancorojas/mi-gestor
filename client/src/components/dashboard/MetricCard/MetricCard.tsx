import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import type { MetricCardProps } from './MetricCard.types'

export function MetricCard({ label, value, change, tone }: MetricCardProps) {
  return (
    <Paper
      component="article"
      variant="outlined"
      sx={{ p: 6, '@media (max-width:44rem)': { p: 4 } }}
    >
      <Typography sx={{ color: 'app.textSoft', fontSize: '0.75rem', fontWeight: 650 }}>
        {label}
      </Typography>
      <Typography
        component="strong"
        sx={{
          display: 'inline-block',
          mt: 2,
          mr: 2,
          fontSize: '1.25rem',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          '@media (max-width:44rem)': { mr: 0, fontSize: '1rem' },
        }}
      >
        {value}
      </Typography>
      <Typography
        component="em"
        sx={{
          color: tone === 'positive' ? 'success.main' : 'error.main',
          fontSize: '0.75rem',
          fontStyle: 'normal',
          fontWeight: 800,
          '@media (max-width:44rem)': { display: 'block', mt: 1 },
        }}
      >
        {change}
      </Typography>
    </Paper>
  )
}
