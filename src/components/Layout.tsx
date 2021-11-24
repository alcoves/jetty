import React from 'react'
import TitleBar from './TitleBar'
import Sidebar from './Sidebar/Index'
import { Flex, Box } from '@chakra-ui/react'

export default function Layout({ children }: { children: any }): JSX.Element {
  return (
    <Box>
      <TitleBar />
      <Flex h='calc(100vh - 20px)'>
        <Sidebar />
        <Box bg='gray.900' w='100%'>
          {children}
        </Box>
      </Flex>
    </Box>
  )
}
