import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function TitleBar() {
  return(
    <Flex bg='gray.900' h='20px'>
      <Flex pl='2' align='center'>
      <Text
        fontSize='.7rem'
        color='gray.500'
        fontWeight='800'
        userSelect='none'
        letterSpacing='.05rem'
        textTransform='uppercase'
      >
        foghorn
      </Text>
      </Flex>
    </Flex>
  )
}