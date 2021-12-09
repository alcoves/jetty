import useUser from '../hooks/useUser'
import React, { useEffect, useState } from 'react'
import { Button, Box, Heading, Input, Spacer, Text } from '@chakra-ui/react'

export default function Settings(): JSX.Element {
  const [appVersion, setAppVersion] = useState()
  const { user, authenticated, loading, logout } = useUser()

  useEffect(() => {
    window['electron'].api.send('getApplicationVersion', '')
    window['electron'].api.receive('getApplicationVersion', ({ version }) => {
      setAppVersion(version)
    })
  }, [])

  return (
    <Box p='4'>
      <Heading size='md'>Settings</Heading>
      <Spacer h='10px' />
      {!loading && authenticated && (
        <Box>
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
          <Button size='sm' bg='brand.red' onClick={logout}>
            Log out
          </Button>
        </Box>
      )}
    </Box>
  )
}
