import React from 'react'
import ChannelList from './ChannelList'
import CreateChannel from './CreateChannel'
import { Flex } from '@chakra-ui/react'

export default function Sidebar(): JSX.Element {
  return (
    <Flex
      p='2'
      h='100%'
      w='220px'
      minW='220px'
      bg='gray.700'
      direction='column'
      alignItems='stretch'
      justify='space-between'
    >
      <Flex direction='column'>
        <CreateChannel />
        <ChannelList />
      </Flex>
      <Flex>Harbor Settings</Flex>
    </Flex>
  )
}
