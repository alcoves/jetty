import React from 'react'
import Chooser from './Chooser'
import Settings from '../Settings/Index'
import ChannelList from '../Harbours/ChannelList'
import CreateChannel from '../Harbours/CreateChannel'
import { Flex } from '@chakra-ui/react'

export default function Sidebar() {
  return (
    <Flex
      p='2'
      h='100%'
      w='220px'
      minW='220px'
      bg='gray.800'
      direction='column'
      alignItems='stretch'
      justify='space-between'
    >
      <Flex direction='column'>
        <Chooser />
        <CreateChannel />
        <ChannelList />
      </Flex>
      <Flex>
        <Settings />
      </Flex>
    </Flex>
  )
}
