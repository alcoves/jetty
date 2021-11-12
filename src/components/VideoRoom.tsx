import React from "react"
import UserVideo from "./UserVideo"
import { Box, Text } from '@chakra-ui/react'
import { useParams } from "react-router-dom"

export default function VoiceChat() {
  const { id } = useParams()

  return (
    <Box>
      <Text>Room ID: {id}</Text>
      <UserVideo/>
    </Box>
  )
}