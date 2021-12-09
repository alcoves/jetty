import Cookies from 'js-cookie'
import TitleBar from './TitleBar'
import TopNavBar from './TopNavBar'
import { Outlet } from 'react-router-dom'
import { Flex, Box } from '@chakra-ui/react'
import { SocketContext } from '../contexts/socket'
import React, { useContext, useEffect } from 'react'
import PrivateRoute from './PrivateRoute'

export default function Layout(): JSX.Element {
  const socket = useContext(SocketContext)

  useEffect(() => {
    socket.emit('join', Cookies.get('token'))
  }, [])

  return (
    <PrivateRoute>
      <Box>
        <TitleBar />
        <TopNavBar />
        <Flex h='calc(100vh - 70px)'>
          <Outlet />
        </Flex>
      </Box>
    </PrivateRoute>
  )
}
