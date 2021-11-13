import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  fonts: {
    body: 'Titillium Web',
    mono: 'Titillium Web',
    heading: 'Titillium Web',
  },
})

export default theme
