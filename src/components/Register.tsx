import TitleBar from './TitleBar'
import { register } from '../lib/api'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Flex, Input, Heading, Button } from '@chakra-ui/react'

export default function Login(): JSX.Element {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  async function handleRegister() {
    await register(email, username, password)
    navigate('/')
    return null
  }

  function enterHandler(e) {
    if (e.key === 'Enter') handleRegister()
  }

  return (
    <Box>
      <TitleBar />
      <Flex justify='center' align='top'>
        <Flex w='300px' mt='100px' direction='column'>
          <Heading size='md'>Register</Heading>
          <Input
            mt='4'
            type='email'
            variant='filled'
            placeholder='email'
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            mt='4'
            type='username'
            variant='filled'
            placeholder='username'
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            mt='4'
            type='password'
            variant='filled'
            placeholder='password'
            onKeyPress={enterHandler}
            onChange={e => setPassword(e.target.value)}
          />
          <Button mt='4' _hover={{ bg: 'teal.500' }} onClick={handleRegister}>
            Register
          </Button>
          <Flex fontSize='.8rem' w='100%' justify='center' p='2'>
            <Link to='/login'>Or login</Link>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
