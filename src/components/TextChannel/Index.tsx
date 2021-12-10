import SendMessage from './SendMessage'
import ChatMessage from '../ChatMessage'
import axios from 'axios'
import useLazyRequest from '../../hooks/useLazyRequest'
import { Box, Button, Flex } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { SocketContext } from '../../contexts/socket'
import React, { useContext, useEffect, useState } from 'react'

export default function TextChannel({ id }: { id: string }) {
  const socket = useContext(SocketContext)
  const { harborId, channelId } = useParams()
  const [wsMessages, setWsMessages] = useState([])
  const [extraMessages, setExtraMessages] = useState([])
  const [getMessages, { data, error, loading }] = useLazyRequest()

  useEffect(() => {
    socket.on('message', message => {
      setWsMessages(prev => [message, ...prev])
      console.log('message recieved', message)
    })
  }, [])

  useEffect(() => {
    if (!data && !error && !loading) {
      getMessages({
        url: `http://localhost:4000/harbors/${harborId}/channels/${channelId}/messages`,
      })
    }
  }, [data, loading, error])

  // async function handleScroll(e) {
  //   const height = e.target.scrollHeight - e.target.clientHeight
  //   const offset = e.target.scrollTop * -1

  //   if (height - offset <= 1) {
  //     handleLoadMore()
  //   }
  // }

  async function handleLoadMore() {
    let before = ''
    if (extraMessages.length) {
      before = extraMessages[extraMessages.length - 1].id
    } else if (data?.payload?.messages.length) {
      before = data?.payload?.messages[data?.payload?.messages.length - 1].id
    }

    if (before) {
      const res = await axios.get(
        `http://localhost:4000/harbors/${harborId}/channels/${channelId}/messages?before=${before}`
      )
      const extraMessagesRes = res?.data?.payload?.messages || []
      setExtraMessages(prev => [...prev, ...extraMessagesRes])
    }
  }

  return (
    <Flex overflowY='auto' direction='column' justify='end' w='100%' h='100%'>
      <Flex overflowY='auto' direction='column-reverse' w='100%'>
        {/* onScroll={handleScroll} */}
        {wsMessages?.map(message => {
          return <ChatMessage key={message.id} message={message} />
        })}
        {data?.payload?.messages?.map(message => {
          return <ChatMessage key={message.id} message={message} />
        })}
        {extraMessages?.map(message => {
          return <ChatMessage key={message.id} message={message} />
        })}
        {!loading && (
          <Flex p='4' w='100%' justify='center'>
            <Button onClick={handleLoadMore} w='auto' size='sm'>
              Load More
            </Button>
          </Flex>
        )}
      </Flex>
      <SendMessage />
    </Flex>
  )
}
