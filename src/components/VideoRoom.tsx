import io from 'socket.io-client'
import simplePeer from 'simple-peer'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import VideoComponent from './VideoComponent'
import { IoExitOutline } from 'react-icons/io5'
import { IconButton, SimpleGrid, Flex, Avatar, Heading } from '@chakra-ui/react'

let peer
let socket

// console.log(simplePeer)

export default function VoiceChat() {
  const localUser = localStorage.getItem('username') || 'unknown'
  const navigate = useNavigate()
  const { roomId } = useParams()
  const [streams, setStreams] = useState([])

  function connectToNewUser(peerId, username, stream) {
    console.log(`connecting to user ${username} with id ${peerId}`, stream)
    const call = peer.call(peerId, stream, { metadata: { username: localUser } })
    console.log('connectToNewUser', call)
    call.on('stream', userVideoStream => {
      handleAddStream({ peerId, stream: userVideoStream, username })
    })
  }

  function handleRemoveStream(peerId) {
    console.log('Removing peerId', peerId)
    setStreams(prevState => prevState.filter(s => s.peerId !== peerId))
  }

  function handleAddStream(opts) {
    setStreams(prevState => [...prevState, opts])
  }

  useEffect(() => {
    console.log('Room mounted')
    // peer = new PeerJS(undefined)
    socket = io(`http://foghorn-api.bken.io:3200`)

    navigator.mediaDevices
      .getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
        },
        // video: true,
      })
      .then(localStream => {
        peer.on('open', function (id) {
          console.log(`Joining room ${roomId} with peerId ${id} as user ${localUser}`)
          socket.emit('join-room', roomId, id, localUser)
          handleAddStream({ peerId: id, stream: localStream, isSelf: true, username: localUser })
        })

        peer.on('call', function (call) {
          console.log('Peer has called', call)
          call.answer(localStream)
          call.on('stream', userVideoStream => {
            console.log('userVideoStream', userVideoStream)
            handleAddStream({
              stream: userVideoStream,
              peerId: call?.peer,
              username: call?.metadata?.username || 'unknown',
            })
          })
        })

        peer.on('disconnected', () => {
          navigate('/')
          console.log('Peer On Disconnected Event')
        })

        socket.on('user-connected', (peerId, username) => {
          console.log('User Connected', peerId, username)
          connectToNewUser(peerId, username, localStream)
        })

        socket.on('user-disconnected', peerId => {
          console.log('User Disconnected Socket Message')
          handleRemoveStream(peerId)
        })
      })
    return () => socket.close()
  }, [])

  return (
    <Flex h='100%'>
      <Flex align='center' justify='end' direction='column' bg='gray.800' w='60px' h='100%'>
        <Flex align='center' py='1'>
          <IconButton onClick={() => peer.disconnect()} aria-label='disconnect' size='md'>
            <IoExitOutline />
          </IconButton>
        </Flex>
        <Flex align='center' h='60px'>
          <Avatar size='sm' name={localUser} />
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
  )
}
