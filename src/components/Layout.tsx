import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import TitleBar from './TitleBar'
import Sidebar from './Sidebar'

export default function Layout({ children }) {
  return (
    <div>
      <TitleBar />
      <Flex h='100%'>
        <Sidebar />
        <Box overflow='auto' w='100%' h='calc(100vh - 20px)' bg='gray.800'>
          {children}
        </Box>
      </Flex>
    </div>
  )
}
