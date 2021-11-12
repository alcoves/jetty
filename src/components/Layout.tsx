import React from 'react'
import { Flex, Box } from '@chakra-ui/react'

export default function Layout({ children }) {
  return (
    <Flex direction='column' w='100vw' h='100vh'>
      <Box bg='gray.900' h='30px'></Box>
      <Flex  w='100%' h='100%'>
        <Box bg='gray.900' w='60px'></Box>
        <Box bg='gray.800' w='100%'>{children}</Box>
      </Flex>
    </Flex>
  )
}