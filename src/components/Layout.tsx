import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import TitleBar from './TitleBar'

export default function Layout({ children }) {
  return (
    <Flex direction='column' w='100vw' h='100vh'>
      <TitleBar/>
      <Flex  w='100%' h='100%'>
        <Box bg='gray.900' w='60px'></Box>
        <Box p='5' bg='gray.800' w='100%'>{children}</Box>
      </Flex>
    </Flex>
  )
}