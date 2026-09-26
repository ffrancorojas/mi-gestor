import { createTheme } from '@mui/material/styles'
import { esES } from '@mui/material/locale'

declare module '@mui/material/styles' {
  interface Palette {
    app: {
      primaryLight: string
      primarySoft: string
      surfaceMuted: string
      textSoft: string
      borderInput: string
      borderSoft: string
      positiveBackground: string
      foodBackground: string
      balanceVariation: string
      overlay: string
    }
  }

  interface PaletteOptions {
    app?: Palette['app']
  }
}

export const appTheme = createTheme(
  {
    cssVariables: true,
    spacing: 4,
    shape: {
      borderRadius: 12,
    },
    palette: {
      primary: {
        main: '#6559ee',
        light: '#e9e7ff',
      },
      success: {
        main: '#16a267',
      },
      error: {
        main: '#ed6e77',
      },
      background: {
        default: '#f7f8fc',
        paper: '#ffffff',
      },
      text: {
        primary: '#20222b',
        secondary: '#858797',
      },
      divider: '#ededf4',
      app: {
        primaryLight: '#e9e7ff',
        primarySoft: '#f1efff',
        surfaceMuted: '#f2f2f7',
        textSoft: '#989aa8',
        borderInput: '#e2e2eb',
        borderSoft: '#e4e4ed',
        positiveBackground: '#e0f8ec',
        foodBackground: '#fff1df',
        balanceVariation: '#c4ffdc',
        overlay: 'rgba(28, 28, 42, 0.4)',
      },
    },
    typography: {
      fontFamily: [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'sans-serif',
      ].join(','),
      h1: {
        fontSize: '2.25rem',
        fontWeight: 800,
        letterSpacing: '-0.05em',
      },
      h2: {
        fontSize: '1rem',
        fontWeight: 700,
        letterSpacing: '-0.03em',
      },
      button: {
        fontWeight: 700,
        textTransform: 'none',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            minWidth: '20rem',
          },
          a: {
            color: 'inherit',
            textDecoration: 'none',
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: '0.75rem',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: '0.5rem',
            backgroundColor: '#ffffff',
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          fullWidth: true,
          size: 'small',
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: {
            borderRadius: '1rem',
          },
        },
      },
    },
  },
  esES,
)
