import React from 'react'
import { Flex, Link, Text } from '@chakra-ui/react'

// import { IoClose } from 'react-icons/io5'

// import { ipcRenderer, shell } from 'electron'
// console.log(ipcRenderer)

// function titleBarAction(action) {
//   console.log('action')
//   ipcRenderer.send('titleBarAction', action)
// }

export default function TitleBar() {
  // ipcRenderer.send('titleBarAction', 'action')

  return (
    <Flex bg='gray.900' h='20px'>
      <Flex justify='space-between' w='100%' pl='2' align='center'>
        <Text
          fontSize='.7rem'
          color='gray.500'
          fontWeight='800'
          userSelect='none'
          letterSpacing='.05rem'
          textTransform='uppercase'
        >
          <Link
          // onClick={() => {
          //   shell.openExternal('https://github.com/bkenio/foghorn')
          // }}
          >
            bken
          </Link>
        </Text>
        <Flex h='20px'>
          {/* <Button h='20px' variant='ghost' rounded='none'>
            <IoClose />
          </Button>
          <Button h='20px' variant='unstyled' rounded='none'>
            <IoClose />
          </Button>
          <Button h='20px' variant='unstyled' rounded='none'>
            <IoClose />
          </Button> */}
        </Flex>
      </Flex>
    </Flex>
  )
}
