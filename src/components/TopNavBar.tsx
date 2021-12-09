import useUser from '../hooks/useUser'
import useRequest from '../hooks/useRequest'
import CreateHarbor from './Harbor/CreateHarbor'
import { IoHomeOutline } from 'react-icons/io5'
import { SocketContext } from '../contexts/socket'
import { Link as RouterDomLink } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Flex, HStack, IconButton, Link, Text } from '@chakra-ui/react'

export default function TopNavBar(): JSX.Element {
  const { user } = useUser()
  const [latency, setLatency] = useState(0)
  const socket = useContext(SocketContext)
  const { data } = useRequest('http://localhost:4000/harbors')

  useEffect(() => {
    let startTime = Date.now()

    setInterval(() => {
      startTime = Date.now()
      socket.emit('ping')
    }, 1000)

    socket.on('pong', () => {
      setLatency(Date.now() - startTime)
    })
  }, [])

  return (
    <Flex bg='gray.900' h='50px'>
      <Flex justify='space-between' w='100%' px='2' align='center'>
        <HStack spacing='2'>
          <Link as={RouterDomLink} to={`/`}>
            <IconButton aria-label='home' icon={<IoHomeOutline />} />
          </Link>
          {data?.payload?.harbors.map(h => {
            return (
              <Link key={h.id} as={RouterDomLink} to={`/harbors/${h.id}`}>
                <Avatar size='sm' name={h.name} />
              </Link>
            )
          })}
          <CreateHarbor />
        </HStack>
        <Text>Latency: {latency}ms</Text>
        <Avatar size='sm' name={user?.username} />
      </Flex>
    </Flex>
  )
}
