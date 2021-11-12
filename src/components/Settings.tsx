import { Box, Flex, Heading, Input, Spacer } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function Settings() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '')

  return (
    <Box>
      <Heading size='md'>Settings</Heading>
      <Spacer h='10px'/>
      <Box>
        <Heading size='xs' mb='2'> Username </Heading>
        <Input
          size='sm'
          w='300px'
          variant='filled'
          value={username}
          onChange={(e) => {
            if (e.target.value.length < 30) {
              setUsername(e.target.value)
              localStorage.setItem('username', e.target.value)
            }
          }}
        />
      </Box>
    </Box>
  )
}