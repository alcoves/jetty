import PeerJS from 'peerjs'
import io from 'socket.io-client'
import { useNavigate, useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { Box, Button, SimpleGrid, Text } from '@chakra-ui/react'
import VideoComponent from './VideoComponent'

let peer
let socket

export default function VoiceChat() {
  const localUser =  localStorage.getItem('username') || 'unknown'
  const navigate = useNavigate()
  const { roomId } = useParams()
  const [localStream, setLocalStream] = useState(null)
  const [streams, setStreams] = useState([])

  function connectToNewUser(userId, username, stream) {
    console.log(`connecting to user ${username} with id ${userId}`, stream)
    const call = peer.call(userId, stream, { metadata: { username: localUser } })
    console.log("connectToNewUser", call)
    call.on("stream", (userVideoStream) => {
      setStreams({
        ...streams,
        [userVideoStream.id]: {
          stream: userVideoStream,
          username,
        }
      })
    })
  }

  function hideVideo() {
    const enabled = localStream.getVideoTracks()[0].enabled
    if (enabled) {
      localStream.getVideoTracks()[0].enabled = false
    } else {
      localStream.getVideoTracks()[0].enabled = true
    }
  }

  function handleMute() {
    const enabled = localStream.getAudioTracks()[0].enabled
    if (enabled) {
      localStream.getAudioTracks()[0].enabled = false
    } else {
      localStream.getAudioTracks()[0].enabled = true
    }
  }

  useEffect(() => {
    console.log("Room mounted")
    peer = new PeerJS(undefined)
    socket = io(`http://10.0.0.77:3100`)

    peer.on('open', function(id) {
      console.log(`Joining room ${roomId} with id ${id} as user ${localUser}`)
      socket.emit("join-room", roomId, id, localUser)
    })

    navigator.mediaDevices
    .getUserMedia({
      // audio: {
      //   channelCount: 1,
      //   autoGainControl: true,
      //   noiseSuppression: true,
      //   echoCancellation: true,
      // },
      video: true,
    })
    .then((localStream) => {
      setLocalStream(localStream)
      console.log("localStream", localStream)

      peer.on('call', function(call) {
        console.log("Peer has called", call)
        call.answer(localStream)
        call.on("stream", (userVideoStream) => {
          console.log("userVideoStream", userVideoStream)
          setStreams({
            ...streams,
            [userVideoStream.id]: {
              stream: userVideoStream,
              username: call?.metadata?.username || 'unknown',
            }
          })
        })
      })

      peer.on('disconnected', () => {
        navigate('/')
        console.log("Peer On Disconnected Event")
      })
  
      socket.on("user-connected", (userId, username) => {
        console.log("User Connected", userId, username)
        connectToNewUser(userId, username, localStream)
      })

      socket.on("user-disconnected", (mediaStreamId) => {
        console.log("User Disconnected Socket Message")
        console.log(`Removing ${mediaStreamId} from list of streams`)
        delete streams[mediaStreamId]
        setStreams(streams)
      })
    })
    return () => socket.close()
  }, [])

  useEffect(() => {
    if (localStream) {
      const video = document.getElementById("me")
      video.srcObject = localStream
      video.addEventListener("loadedmetadata", () => {
        video.play()
        console.log("Loaded localstream")
      })
    }
  }, [localStream])

  return (
    <Box>
      <Text>Room ID: {roomId}</Text>
      <Button onClick={hideVideo}>Toggle Camera</Button>
      <Button onClick={handleMute}>Mute</Button>
      <Button onClick={() => peer.disconnect()}> Disconnect </Button>
      {localUser}
      <video id='me' muted/>
      <br></br>
      <SimpleGrid id='video-grid' columns={2} spacing={20} justify='center' align='center'>
        {Object.values(streams).map(({ stream, username }) => {
          // onLoadedMetadata={(v) => v.play()}
          return (
            <Box key={stream.id} h='400px' width='300px'>
              {/* <Box>{stream.id}</Box> */}
              <Box>{username}</Box>
              <VideoComponent srcObject={stream} autoPlay/>
            </Box>
          )
        })}  
      </SimpleGrid>
    </Box>
  )
}