import React from 'react'
import { Button, Flex, Link } from '@chakra-ui/react'
import { Link as RouterDomLink } from 'react-router-dom'
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5'

export default function Sidebar() {
  return (
    <Flex justify='space-between' direction='column' w='60px' bg='gray.900'>
      <Flex justify='center' align='center' h='60px'>
        <Link as={RouterDomLink} to='/'>
          <Button w='60px' h='60px' variant='ghost' rounded='none'>
            <IoHomeOutline />
          </Button>
        </Link>
      </Flex>
      <Flex justify='center' align='center' h='60px'>
        <Link as={RouterDomLink} to='/settings'>
          <Button w='60px' h='60px' variant='ghost' rounded='none'>
            <IoSettingsOutline />
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}
