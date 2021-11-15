import TitleBar from './TitleBar'
import useUser from '../hooks/useUser'
import React, { useState } from 'react'
import { login } from '../lib/api'
import { Link, useNavigate } from 'react-router-dom'
import { Text, Box, Flex, Input, Heading, Button } from '@chakra-ui/react'

export default function Login(): JSX.Element {
  const navigate = useNavigate()
  const { authenticated } = useUser()
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
    try {
      await login(email, password)
      navigate('/')
    } catch (error) {
      setErrorMsg('Email or password is invalid')
    }
  }

  function enterHandler(e) {
    if (e.key === 'Enter') handleLogin()
  }

  if (authenticated) {
    navigate('/')
    return null
  }

  return (
    <Box>
      <TitleBar />
      <Flex justify='center' align='top'>
        <Flex w='300px' mt='100px' direction='column'>
          <Flex justify='center'>
            <Heading size='lg'>Hello there!</Heading>
          </Flex>
          <Flex justify='center'>
            <Text color='red.500'>{errorMsg}</Text>
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
