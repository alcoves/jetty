import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  fonts: {
    body: 'OpenSans',
    mono: 'OpenSans',
    heading: 'OpenSans',
  },
  colors: {
    brand: {
      red: '#bf1e2e',
    },
    gray: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    },
    gray2: {
      50: '#e7ebf1',
      100: '#dbe0ea',
      200: '#b5c1d5',
      300: '#50658a',
      400: '#334058',
      500: '#2c374c',
      600: '#252e3f',
      700: '#1d2533',
      800: '#161c26',
      900: '#0f131a',
    },
  },
})

export default theme
