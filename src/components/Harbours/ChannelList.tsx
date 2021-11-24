import React from 'react'
import { IoChatbubbles } from 'react-icons/io5'
import { Button, Text, VStack } from '@chakra-ui/react'
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
          <Button
            h='30px'
            w='100%'
            color='gray.300'
            key={channel.id}
            justifyContent='start'
            leftIcon={<IoChatbubbles size='15px' />}
            variant={channelId === channel.id ? 'solid' : 'ghost'}
            onClick={() => navigate(`/harbours/${harbourId}/channels/${channel.id}`)}
          >
            <Text fontWeight={600} fontSize='.9rem'>
              {channel.name}
            </Text>
          </Button>
        )
      })}
    </VStack>
  )
}
