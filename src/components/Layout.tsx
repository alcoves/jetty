import React from 'react'
import TitleBar from './TitleBar'
import TopNavBar from './TopNavBar'
import { Flex, Box } from '@chakra-ui/react'

export default function Layout({ children }: { children: any }): JSX.Element {
  return (
    <Box>
      <TitleBar />
      <TopNavBar />
      <Flex h='calc(100vh - 70px)'>{children}</Flex>
    </Box>
  )
}
