import SendMessage from './SendMessage'
import ChatMessage from '../ChatMessage'
import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { GET_CHANNEL_MESSAGES, CHANNEL_MESSAGES_SUBSCRIPTION } from '../../graphql/schema'

export default function TextChannel({ id }: { id: string }) {
  const [wsMessages, setWsMessages] = useState([])

  const { fetchMore, data, error, loading } = useQuery(GET_CHANNEL_MESSAGES, {
    notifyOnNetworkStatusChange: true,
    variables: { input: { channelId: id } },
  })

  const { data: data2, loading: loading2 } = useSubscription(CHANNEL_MESSAGES_SUBSCRIPTION, {
    variables: { channelId: id },
  })

  useEffect(() => {
    console.log('on wss')
    if (data2) {
      setWsMessages(prevState => [...data2.channelMessages, ...prevState])
    }
  }, [data2, loading2])

  function handleScroll(e) {
    const height = e.target.scrollHeight - e.target.clientHeight
    const offset = e.target.scrollTop * -1

    if (height - offset <= 1) {
      // @ts-ignore
      const fiterDate = data.getChannelMessages[data.getChannelMessages.length - 1].createdAt
      console.log('top of page reached', data?.getChannelMessages?.length, parseInt(fiterDate))

      if (!loading && !error) {
        fetchMore({
          variables: {
            input: {
              channelId: id,
              before: parseInt(fiterDate),
            },
          },
        })
      }
    }
  }

  return (
    <Flex overflowY='auto' direction='column' justify='end' w='100%' h='100%'>
      <Flex onScroll={handleScroll} overflowY='auto' direction='column-reverse' w='100%'>
        {wsMessages?.map(message => {
          return <ChatMessage key={message.id} message={message} />
        })}
        {data?.getChannelMessages?.map(message => {
          return <ChatMessage key={message.id} message={message} />
        })}
      </Flex>
      <SendMessage channelId={id} />
    </Flex>
  )
}
