import useLazyRequest from '../../hooks/useLazyRequest'
import { useParams } from 'react-router-dom'
import { Box, Input } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'

export default function SendMessage() {
  const inputRef = useRef(null)
  const [content, setContent] = useState('')
  const { harborId, channelId } = useParams()
  const [sendMessage, { data, loading, error }] = useLazyRequest()

  async function submitMessage() {
    await sendMessage({
      url: `http://localhost:4000/harbors/${harborId}/channels/${channelId}/messages`,
      method: 'post',
      data: {
        content: content,
        channel: channelId,
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
