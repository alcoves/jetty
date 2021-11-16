import io from 'socket.io-client'
import React, { useEffect, useState } from 'react'
import SimplePeer from 'simple-peer'
import { getUserSync } from '../hooks/useUser'
import Layout from './Layout'
import { IoExitOutline } from 'react-icons/io5'
import VideoComponent from './VideoComponent'
import { IconButton, SimpleGrid, Flex, Avatar, Heading } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'

let socket

export default function VoiceRoom(): JSX.Element {
  const { user } = getUserSync()
  const navigate = useNavigate()
  const { roomId } = useParams()
  const [streams, setStreams] = useState([])

  function handleRemoveStream(peerId) {
    console.log('Removing peerId', peerId)
    setStreams(prevState => prevState.filter(s => s.peerId !== peerId))
  }

  function handleAddStream(opts) {
    setStreams(prevState => [...prevState, opts])
  }

  useEffect(() => {
    console.log('Room mounted')
    socket = io(`http://foghorn-api.bken.io:3200`)
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
        },
      })
      .then(stream => {
        const peer = new SimplePeer({
          initiator: true,
          stream: stream,
        })
        const peer2 = new SimplePeer()

        peer.on('error', console.error)
        peer2.on('error', console.error)

        peer.on('connect', () => {
          console.log('connected')
          console.log(`Joining room ${roomId} with peerId ${user?.id} as user ${user?.username}`)
          socket.emit('join-room', roomId, user?.id, user?.username)
          handleAddStream({ peerId: 'self', isSelf: true, stream, username: user?.username })
        })

        peer.on('signal', data => {
          peer2.signal(data)
          console.log('SIGNAL', data)
        })

        peer2.on('signal', data => {
          peer.signal(data)
        })

        peer.on('data', data => {
          console.log('data: ' + data)
        })

        // Peer 2 testing

        peer2.on('stream', remoteStream => {
          console.log('GOT STREAM', remoteStream)
          handleAddStream({ peerId: '123', stream: remoteStream, username: 'test' })
        })

        function connectToNewUser(peerId, username, stream) {
          console.log(`connecting to user ${username} with id ${peerId}`, stream)
          const call = peer.call(peerId, stream, { metadata: { username: user.username } })
          console.log('connectToNewUser', call)
          call.on('stream', userVideoStream => {
            handleAddStream({ peerId, stream: userVideoStream, username })
          })
        }

        socket.on('user-connected', (peerId, username) => {
          console.log('User Connected', peerId, username)
          connectToNewUser(peerId, username, stream)
        })

        socket.on('user-disconnected', peerId => {
          console.log('User Disconnected Socket Message')
          handleRemoveStream(peerId)
        })
      })
      .catch(() => {
        // console.error(error)
      })

    return () => socket.close()
  }, [])

  return (
    <Layout>
      <Flex h='100%'>
        <Flex align='center' justify='end' direction='column' bg='gray.800' w='60px' h='100%'>
          <Flex align='center' py='1'>
            <IconButton aria-label='disconnect' size='md'>
              <IoExitOutline />
            </IconButton>
          </Flex>
          <Flex align='center' h='60px'>
            <Avatar size='sm' name={user?.username} />
          </Flex>
        </Flex>
        <Flex p='4' direction='column' w='100%'>
          <Heading size='md' mb='4'>
            Room {roomId}
          </Heading>
          <SimpleGrid spacing='10' align='center' justify='center' minChildWidth='300px'>
            {Object.values(streams).map(({ stream, username, isSelf }) => {
              return (
                <VideoComponent
                  autoPlay
                  muted={isSelf}
                  stream={stream}
                  key={stream.id}
                  username={username}
                />
              )
            })}
          </SimpleGrid>
        </Flex>
      </Flex>
    </Layout>
  )
}
