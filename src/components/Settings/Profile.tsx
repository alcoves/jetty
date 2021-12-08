import React from 'react'
import useUser from '../../hooks/useUser'
import AvatarUpload from './AvatarUpload'
import { Flex, Heading } from '@chakra-ui/react'

export default function Profile(): JSX.Element {
  const { user, loading, authenticated } = useUser()

  if (!loading && authenticated) {
    return (
      <Flex direction='column'>
        <Heading size='md' mb='20px'>
          Your Profile
        </Heading>
        <Flex>
          <AvatarUpload />
          <Heading size='sm' ml='20px'>
            {user.username}
          </Heading>
        </Flex>
      </Flex>
    )
  }

  return null
}
