import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { esES as datePickersEsES } from '@mui/x-date-pickers/locales'
import 'dayjs/locale/es'
import { App } from '@/app'
import { AuthProvider } from '@/auth'
import { appTheme } from '@/theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="es"
        localeText={datePickersEsES.components.MuiLocalizationProvider.defaultProps.localeText}
      >
        <CssBaseline />
        <AuthProvider>
          <App />
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

if ('serviceWorker' in navigator)
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'))
