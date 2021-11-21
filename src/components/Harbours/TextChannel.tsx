import { DateTime } from 'luxon'
import React, { useRef, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Avatar, Box, Flex, Input, Text } from '@chakra-ui/react'
import { GET_CHANNEL_MESSAGES, CREATE_MESSAGE } from '../../graphql/schema'

export default function TextChannel({ id }: { id: string }) {
  const inputRef = useRef(null)
  const [content, setContent] = useState('')

  const {
    data: getChannelMessagesData,
    error: getChannelMessagesError,
    loading: getChannelMessagesLoading,
  } = useQuery(GET_CHANNEL_MESSAGES, { variables: { channel: id }, pollInterval: 500 })

  const [
    mutateFunction,
    { data: addedMessageData, loading: sendingMessageLoading, error: errorSendingMessage },
  ] = useMutation(CREATE_MESSAGE)

  async function submitMessage() {
    await mutateFunction({
      variables: {
        input: {
          channel: id,
          content: content,
        },
      },
    })
    setContent('')
    inputRef.current.focus()
  }

  return (
    <Flex direction='column' justify='end' w='100%' p='15px'>
      <Flex overflow='auto' direction='column-reverse'>
        {getChannelMessagesData?.getChannelMessages.map(message => {
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
      <Box mt='15px'>
        <Input
          multiple
          autoFocus
          ref={inputRef}
          value={content}
          placeholder={`Message ${id}`}
          isDisabled={sendingMessageLoading}
          onChange={e => setContent(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter' && content.length > 0) {
              submitMessage()
            }
          }}
        />
      </Box>
    </Flex>
  )
}
