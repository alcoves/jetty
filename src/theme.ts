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
})

export default theme
