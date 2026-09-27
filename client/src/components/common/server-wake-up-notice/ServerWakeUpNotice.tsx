import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar'
import { useApiStatus } from '@/api'

export function ServerWakeUpNotice() {
  const { isWakingUp } = useApiStatus()

  return (
    <Snackbar
      open={isWakingUp}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{
        bottom: { xs: 2, sm: 3 },
        pointerEvents: 'none',
        width: { xs: 'calc(100% - 2rem)', sm: 'auto' },
      }}
    >
      <Alert
        icon={<CircularProgress color="inherit" size={20} />}
        severity="info"
        sx={{ alignItems: 'center', pointerEvents: 'none', width: '100%' }}
      >
        El servidor está iniciándose. La información se cargará automáticamente; puede tardar hasta
        un minuto.
      </Alert>
    </Snackbar>
  )
}
