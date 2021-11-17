import Layout from './Layout'
import useUser from '../hooks/useUser'
import { IoFlash } from 'react-icons/io5'
import { SocketContext } from '../contexts/socket'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Box, Heading, Input, Spacer, Text, Flex } from '@chakra-ui/react'

export default function Settings(): JSX.Element {
  const { socket } = useContext(SocketContext)
  const [appVersion, setAppVersion] = useState()
  const { user, authenticated, loading, logout } = useUser()

  useEffect(() => {
    window['electron'].api.send('getApplicationVersion', '')
    window['electron'].api.receive('getApplicationVersion', ({ version }) => {
      setAppVersion(version)
    })
  }, [])

  return (
    <Layout>
      <Box p='4'>
        <Heading size='md'>Settings</Heading>
        <Spacer h='10px' />
        {!loading && authenticated && (
          <Box>
            <Flex my='2' direction='column'>
              <Heading size='xs' mb='2'>
                WebSocket Status
              </Heading>
              <Flex align='center'>
                <Box color={`${socket.connected ? 'green.500' : 'red.500'}`}>
                  <IoFlash />
                </Box>
                <Text ml='1' fontSize='.9rem'>
                  {socket.connected ? 'Connected' : 'Disconnected'}
                </Text>
              </Flex>
            </Flex>
            <Box my='2'>
              <Heading size='xs' mb='2'>
                Email
              </Heading>
              <Input disabled size='sm' w='300px' variant='filled' defaultValue={user.email} />
            </Box>
            <Box my='2'>
              <Heading size='xs' mb='2'>
                Username
              </Heading>
              <Input disabled size='sm' w='300px' variant='filled' defaultValue={user.username} />
            </Box>
            <Box my='2'>
              <Heading size='xs' mb='2'>
                User ID
              </Heading>
              <Input disabled size='sm' w='300px' variant='filled' defaultValue={user.id} />
            </Box>
            <Box my='2'>
              <Text>Application Version: {appVersion}</Text>
            </Box>
            <Button size='sm' bg='red.500' _hover={{ bg: 'red.600' }} onClick={logout}>
              Log out
            </Button>
          </Box>
        )}
      </Box>
    </Layout>
  )
}
