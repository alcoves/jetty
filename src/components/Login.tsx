import TitleBar from './TitleBar'
import useUser from '../hooks/useUser'
import React, { useState } from 'react'
import { login } from '../lib/api'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Box, Flex, Input, Heading, Button } from '@chakra-ui/react'

export default function Login(): JSX.Element {
  const { user } = useUser()

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
    await login(email, password)
    navigate('/')
  }

  if (user) {
    navigate('/')
    return null
  }

  function enterHandler(e) {
    if (e.key === 'Enter') handleLogin()
  }

  return (
    <Box>
      <TitleBar />
      <Flex justify='center' align='top'>
        <Flex w='300px' mt='100px' direction='column'>
          <Flex justify='center'>
            <Heading size='lg'>Hello There!</Heading>
          </Flex>

          <Input
            mt='4'
            type='email'
            variant='filled'
            placeholder='email'
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            mt='4'
            type='password'
            variant='filled'
            placeholder='password'
            onKeyPress={enterHandler}
            onChange={e => setPassword(e.target.value)}
          />
          <Button mt='4' _hover={{ bg: 'teal.500' }} onClick={handleLogin}>
            Login
          </Button>
          <Flex fontSize='.8rem' w='100%' justify='center' p='2'>
            <Link to='/register'>Or register a new account</Link>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
