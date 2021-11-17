import { Box } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { SocketContext } from '../contexts/socket'

export default function RoomStatus({ roomId }) {
  const socket = useContext(SocketContext)
  return (
    <Box>
      <Box>You are connected to {roomId}</Box>
    </Box>
  )
}
