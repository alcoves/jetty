import React, { useRef, useState } from 'react'
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
