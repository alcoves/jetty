import SendMessage from './SendMessage'
import ChatMessage from '../ChatMessage'
import { Flex } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import { fetcher } from '../../config/fetcher'
import { SocketContext } from '../../contexts/socket'

export default function TextChannel({ id }: { id: string }) {
  const socket = useContext(SocketContext)

  useEffect(() => {
    socket.on('heartbeat', () => {
      console.log('heartbeat recieved')
    })

    // return () => {
    //   socket.disconnect()
    // }
  }, [])

  const { harbourId, channelId } = useParams()
  const getMessagesUrl = `http://localhost:4000/harbours/${harbourId}/channels/${channelId}/messages`
  const { data, error } = useSWR(getMessagesUrl, fetcher)

  // const [wsMessages, setWsMessages] = useState([])

  // const {}

  // const { fetchMore, data, error, loading } = useQuery(GET_CHANNEL_MESSAGES, {
  //   notifyOnNetworkStatusChange: true,
  //   variables: { input: { channelId: id } },
  // })

  // const { data: data2, loading: loading2 } = useSubscription(CHANNEL_MESSAGES_SUBSCRIPTION, {
  //   variables: { channelId: id },
  // })

  // useEffect(() => {
  //   console.log('on wss')
  //   if (data2) {
  //     setWsMessages(prevState => [...data2.channelMessages, ...prevState])
  //   }
  // }, [data2, loading2])

  function handleScroll(e) {
    const height = e.target.scrollHeight - e.target.clientHeight
    const offset = e.target.scrollTop * -1

    if (height - offset <= 1) {
      // @ts-ignore
      // const fiterDate = data.getChannelMessages[data.getChannelMessages.length - 1].createdAt
      // console.log('top of page reached', data?.getChannelMessages?.length, parseInt(fiterDate))
      // if (!loading && !error) {
      // fetchMore({
      //   variables: {
      //     input: {
      //       channelId: id,
      //       before: parseInt(fiterDate),
      //     },
      //   },
      // })
      // }
    }
  }

  return (
    <Flex overflowY='auto' direction='column' justify='end' w='100%' h='100%'>
      <Flex onScroll={handleScroll} overflowY='auto' direction='column-reverse' w='100%'>
        {/* {wsMessages?.map(message => {
          return <ChatMessage key={message.id} message={message} />
        })} */}
        {data?.payload?.messages?.map(message => {
          return <ChatMessage key={message.id} message={message} />
        })}
      </Flex>
      <SendMessage channelId={id} />
    </Flex>
  )
}
