import React from 'react'
import AvatarUpload from './AvatarUpload'
import useUser from '../../hooks/useUser'
import { Button, VStack } from '@chakra-ui/react'

export default function Account() {
  const { logout } = useUser()

  return (
    <VStack spacing={2} align='start'>
      <AvatarUpload />
      <Button onClick={logout} colorScheme='red' variant='ghost' w='150px' size='sm'>
        Log Out
      </Button>
    </VStack>
  )
}
