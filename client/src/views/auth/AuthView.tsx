import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { LogIn } from 'lucide-react'
import { useAuth } from '@/auth'

export function AuthView({ configuration = false }: { configuration?: boolean }) {
  const { signInWithGoogle } = useAuth()
  const [error, setError] = useState('')

  const handleGoogleSignIn = async () => {
    setError('')

    try {
      await signInWithGoogle()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'No se pudo iniciar sesión con Google.')
    }
  }

  return (
    <Box sx={{ display: 'grid', minHeight: '100vh', placeItems: 'center', p: 5 }}>
      <Paper variant="outlined" sx={{ width: 'min(100%, 26rem)', p: 8, textAlign: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: '1.75rem', mb: 3 }}>
          mi gestor
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 6 }}>
          {configuration
            ? 'Configura las variables de Firebase para activar el acceso.'
            : 'Gestiona tus cuentas y movimientos de forma sencilla.'}
        </Typography>
        {!configuration && (
          <>
            {error && (
              <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
                {error}
              </Alert>
            )}
            <Button
              fullWidth
              variant="contained"
              startIcon={<LogIn size={18} />}
              onClick={() => void handleGoogleSignIn()}
            >
              Continuar con Google
            </Button>
          </>
        )}
      </Paper>
    </Box>
  )
}
