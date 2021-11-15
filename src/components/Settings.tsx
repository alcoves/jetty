import React from 'react'
import Layout from './Layout'
import useUser from '../hooks/useUser'
import { Button, Box, Heading, Input, Spacer } from '@chakra-ui/react'

export default function Settings() {
  const { user, authenticated, loading, logout } = useUser()

  return (
    <Layout>
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
            <Button size='sm' bg='red.500' _hover={{ bg: 'red.600' }} onClick={logout}>
              Log out
            </Button>
          </Box>
        )}
      </Box>
    </Layout>
  )
}
