import React from 'react'
import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import { IoCloseOutline, IoRemoveOutline, IoStopOutline } from 'react-icons/io5'

export default function TitleBar(): JSX.Element {
  function titleBarAction(action) {
    window['electron'].api.send('titleBarAction', action)
  }

  return (
    <Flex bg='gray.900' h='20px'>
      <Flex justify='space-between' w='100%' pl='2' align='center'>
        <Text
          ml='1'
          fontSize='.7rem'
          color='gray.500'
          fontWeight='800'
          userSelect='none'
          letterSpacing='.05rem'
          textTransform='uppercase'
        >
          bken
        </Text>
        <Box w='100%' h='100%' userSelect='none' className='titleBarDrag' />
        <Flex h='20px'>
          <IconButton
            h='20px'
            w='28px'
            minW='28px'
            rounded='none'
            variant='ghost'
            aria-label='quit'
            icon={<IoRemoveOutline size='14px' />}
            onClick={() => titleBarAction('minimize')}
          />
          <IconButton
            h='20px'
            w='28px'
            minW='28px'
            rounded='none'
            variant='ghost'
            aria-label='quit'
            icon={<IoStopOutline size='14px' />}
            onClick={() => titleBarAction('maximize')}
          />
          <IconButton
            h='20px'
            w='28px'
            minW='28px'
            rounded='none'
            variant='ghost'
            aria-label='quit'
            icon={<IoCloseOutline size='20px' />}
            _hover={{ bg: 'brand.red' }}
            onClick={() => titleBarAction('quit')}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
