import React from 'react'
import { IoChatbubbles } from 'react-icons/io5'
import { Flex, Text, VStack } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'

interface Channel {
  id: string
  name: string
}

export default function ChannelList({
  harbourId,
  channels,
}: {
  harbourId: string
  channels: Channel[]
}) {
  const navigate = useNavigate()
  const { channelId } = useParams()

  return (
    <VStack spacing={1} direction='column' w='100%' mt='2'>
      {channels?.map(channel => {
        return (
          <Flex
            w='100%'
            px='8px'
            py='4px'
            rounded='md'
            align='center'
            cursor='pointer'
            color='gray.300'
            key={channel.id}
            _hover={{ bg: 'gray.600' }}
            bg={channelId === channel.id ? 'gray.600' : 'transparent'}
            onClick={() => navigate(`/harbours/${harbourId}/channels/${channel.id}`)}
          >
            <IoChatbubbles size='15px' />
            <Text fontWeight={500} fontSize='.9rem' ml='3'>
              {channel.name}
            </Text>
          </Flex>
        )
      })}
    </VStack>
  )
}
