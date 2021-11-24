import React from 'react'
import { Button } from '@chakra-ui/react'
import { IoSettingsOutline } from 'react-icons/io5'

export default function Settings() {
  return (
    <Button
      size='sm'
      w='100%'
      aria-label='create-harbour'
      leftIcon={<IoSettingsOutline size='15px' />}
    >
      Settings
    </Button>
  )
}
