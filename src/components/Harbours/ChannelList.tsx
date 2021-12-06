import useSWR from 'swr'
import React from 'react'
import { fetcher } from '../../config/fetcher'
import { IoChatbubbles } from 'react-icons/io5'
import { Button, Text, VStack } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'

export default function ChannelList() {
  const navigate = useNavigate()
  const { harbourId, channelId } = useParams()
  const { data, error } = useSWR(
    harbourId ? `http://localhost:4000/harbours/${harbourId}/channels` : null,
    fetcher
  )

  if (error && !data) return null

  return (
    <VStack spacing={1} direction='column' w='100%' mt='2'>
      {data?.payload?.channels?.map(channel => {
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
