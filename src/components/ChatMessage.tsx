import { Avatar, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function ChatMessage({ message }: { message: any }) {
  return (
    <Flex key={message.id} p='2'>
      <Avatar size='sm' name={message?.user?.username} mr='15px' />
      <Flex direction='column'>
        <Flex>
          <Text color='gray.400' fontWeight={400} fontSize='.8rem'>
            {message?.user?.username}
          </Text>
        </Flex>
        <Text fontWeight={500} fontSize='.9rem'>
          {message.content}
        </Text>
      </Flex>
    </Flex>
  )
}
