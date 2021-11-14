import PeerJS from 'peerjs'
import io from 'socket.io-client'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import VideoComponent from './VideoComponent'
import {
  IoCamera,
  IoCameraOutline,
  IoExitOutline,
  IoMicOffOutline,
  IoMicOutline,
} from 'react-icons/io5'
import {
  IconButton,
  HStack,
  Box,
  Button,
  SimpleGrid,
  Text,
  Flex,
  Avatar,
  Heading,
} from '@chakra-ui/react'

let peer
let socket

// const streams2 = {
//   '1': { stream: null, username: 'a' },
//   '2': { stream: null, username: 'b' },
//   '3': { stream: null, username: 'c' },
//   '4': { stream: null, username: 'd' },
//   '5': { stream: null, username: 'e' },
//   '6': { stream: null, username: 'f' },
//   '7': { stream: null, username: 'g' },
//   '8': { stream: null, username: 'h' },
//   '9': { stream: null, username: 'i' },
//   '10': { stream: null, username: 'j' }
// }

export default function VoiceChat() {
  const localUser = localStorage.getItem('username') || 'unknown'
  const navigate = useNavigate()
  const { roomId } = useParams()
  const [localStream, setLocalStream] = useState(null)
  const [streams, setStreams] = useState({})
  // const [videoEnabled, setVideoEnabled] = useState(false)
  // const [audioEnabled, setAudioEnabled] = useState(false)

  function connectToNewUser(userId, username, stream) {
    console.log(`connecting to user ${username} with id ${userId}`, stream)
    const call = peer.call(userId, stream, { metadata: { username: localUser } })
    console.log('connectToNewUser', call)
    call.on('stream', userVideoStream => {
      setStreams(prevState => ({
        ...prevState,
        [userVideoStream.id]: {
          stream: userVideoStream,
          username,
        },
      }))
    })
  }

  useEffect(() => {
    console.log('Room mounted')
    peer = new PeerJS(undefined)
    socket = io(`http://foghorn-api.bken.io:3200`)

    peer.on('open', function (id) {
      console.log(`Joining room ${roomId} with id ${id} as user ${localUser}`)
      socket.emit('join-room', roomId, id, localUser)
    })

    navigator.mediaDevices
      .getUserMedia({
        audio: {
          channelCount: 1,
          autoGainControl: true,
          noiseSuppression: true,
          echoCancellation: true,
        },
        // video: true,
      })
      .then(localStream => {
        setLocalStream(localStream)
        console.log('localStream', localStream)

        peer.on('call', function (call) {
          console.log('Peer has called', call)
          call.answer(localStream)
          call.on('stream', userVideoStream => {
            console.log('userVideoStream', userVideoStream)
            setStreams(prevState => ({
              ...prevState,
              [userVideoStream.id]: {
                stream: userVideoStream,
                username: call?.metadata?.username || 'unknown',
              },
            }))
          })
        })

        peer.on('disconnected', () => {
          navigate('/')
          console.log('Peer On Disconnected Event')
        })

        socket.on('user-connected', (userId, username) => {
          console.log('User Connected', userId, username)
          connectToNewUser(userId, username, localStream)
        })

        socket.on('user-disconnected', mediaStreamId => {
          console.log('User Disconnected Socket Message')
          console.log(`Removing ${mediaStreamId} from list of streams`)
          delete streams[mediaStreamId]
          setStreams(streams)
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
          {Object.values({ me: { stream: localStream, username: localUser }, ...streams }).map(
            ({ stream, username }, index) => {
              return (
                <VideoComponent
                  autoPlay
                  stream={stream}
                  username={username}
                  muted={index === 0}
                  key={stream?.id || localUser}
                />
              )
            }
          )}
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}
