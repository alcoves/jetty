import React, { useEffect, useRef, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Box, Input } from '@chakra-ui/react'
import { CREATE_MESSAGE } from '../../graphql/schema'

export default function SendMessage({ channelId }: { channelId: string }) {
  const inputRef = useRef(null)
  const [content, setContent] = useState('')
  const [
    mutateFunction,
    { data: addedMessageData, loading: sendingMessageLoading, error: errorSendingMessage },
  ] = useMutation(CREATE_MESSAGE)

  useEffect(() => {
    // setInterval(() => {
    //   mutateFunction({
    //     variables: {
    //       input: {
    //         content: (Math.random() + 1).toString(36).substring(2),
    //         channel: channelId,
    //       },
    //     },
    //   })
    // }, 100)
  }, [])

  async function submitMessage() {
    await mutateFunction({
      variables: {
        input: {
          content: content,
          channel: channelId,
        },
      },
    })
    setContent('')
    inputRef.current.focus()
  }

  return (
    <Box pl='2' pr='4'>
      <Input
        multiple
        autoFocus
        ref={inputRef}
        value={content}
        variant='filled'
        placeholder={`Message ${channelId}`}
        onChange={e => setContent(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter' && content.length > 0) {
            submitMessage()
          }
        }}
      />
    </Box>
  )
}
