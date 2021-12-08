import React, { useEffect } from 'react'
import TitleBar from './TitleBar'
import TopNavBar from './TopNavBar'
import { Flex, Box } from '@chakra-ui/react'
import { SocketContext, socket } from '../contexts/socket'
import { Outlet } from 'react-router-dom'

export default function Layout(): JSX.Element {
  useEffect(() => {
    console.log('Layout mounted')
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      <Box>
        <TitleBar />
        <TopNavBar />
        <Flex h='calc(100vh - 70px)'>
          <Outlet />
        </Flex>
      </Box>
    </SocketContext.Provider>
  )
}
