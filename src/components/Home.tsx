import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Flex, Input } from '@chakra-ui/react'

export default function Home() {
  const navigate = useNavigate()
  const [roomId, setRoomId] = useState('')

  function handlePush() {
    navigate(`/rooms/${roomId}`)
  }

  return(
    <Flex h='100%' justify='center' direction='column' align='center'>
      <Input
        w='400px'
        size='lg'
        variant='filled'
        value={roomId}
        placeholder='Enter a room code'
        onChange={(e) => setRoomId(e.target.value.toLowerCase())}
        onKeyPress={(e) => {
          if(e.key === 'Enter') handlePush()
        }}
      />
      <Button
        mt='2'
        w='400px'
        size='lg'
        onClick={handlePush}
        isDisabled={!roomId.length}
      >
        Join
      </Button>
    </Flex>
  )
}