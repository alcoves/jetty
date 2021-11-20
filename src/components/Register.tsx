import TitleBar from './TitleBar'
import useUser from '../hooks/useUser'
import { REGISTER } from '../graphql/schema'
import { useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Text, Box, Flex, Input, Heading, Button } from '@chakra-ui/react'

export default function Register(): JSX.Element {
  const navigate = useNavigate()
  const { authenticated, login } = useUser()
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [mutateFunction, { data, loading, error }] = useMutation(REGISTER)

  useEffect(() => {
    if (error) setErrorMsg(error.message)
    if (data) login(data.register.accessToken)
  }, [data, error])

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
            <Heading size='lg'>Create an Account</Heading>
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
            onKeyPress={e => {
              if (e.key === 'Enter') {
                mutateFunction({
                  variables: {
                    input: {
                      email,
                      username,
                      password,
                    },
                  },
                })
              }
            }}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            mt='4'
            isDisabled={loading}
            _hover={{ bg: 'teal.500' }}
            onClick={() => {
              mutateFunction({
                variables: {
                  input: {
                    email,
                    username,
                    password,
                  },
                },
              })
            }}
          >
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
