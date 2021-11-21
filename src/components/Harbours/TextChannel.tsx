import SendMessage from './SendMessage'
import React, { useEffect, useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { Avatar, Flex, Text } from '@chakra-ui/react'
import { GET_CHANNEL_MESSAGES, CHANNEL_MESSAGES_SUBSCRIPTION } from '../../graphql/schema'

export default function TextChannel({ id }: { id: string }) {
  const [messages, setMessages] = useState([])

  const {
    refetch,
    data: getChannelMessagesData,
    error: getChannelMessagesError,
    loading: getChannelMessagesLoading,
  } = useQuery(GET_CHANNEL_MESSAGES, {
    variables: { input: { channel: id, skip: 0 } },
  })

  const { data: channelSubData, loading: channelSubLoading } = useSubscription(
    CHANNEL_MESSAGES_SUBSCRIPTION,
    {
      variables: { channelId: id },
    }
  )

  useEffect(() => {
    if (getChannelMessagesData && !getChannelMessagesError && !getChannelMessagesLoading) {
      setMessages(getChannelMessagesData.getChannelMessages)
    }
  }, [getChannelMessagesData, getChannelMessagesError, getChannelMessagesLoading])

  useEffect(() => {
    if (channelSubData) {
      setMessages(prevState => [channelSubData.channelMessages, ...prevState])
    }
  }, [channelSubData, channelSubLoading])

  function handleScroll(e) {
    const height = e.target.scrollHeight - e.target.clientHeight
    const offset = e.target.scrollTop * -1

    if (height - offset === 1) {
      refetch()
      console.log('top of page reached')
    }
  }

  return (
    <Flex direction='column' justify='end' w='100%' p='15px'>
      <Flex overflow='auto' direction='column-reverse' onScroll={handleScroll}>
        {messages?.map(message => {
          return (
            <Flex key={message._id} p='2'>
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
        })}
      </Flex>
      <SendMessage channelId={id} />
    </Flex>
  )
}
