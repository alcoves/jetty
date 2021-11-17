import hark from 'hark'
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'
import { getUserSync } from '../hooks/useUser'
import { Avatar, Box } from '@chakra-ui/react'
import { SocketContext } from '../contexts/socket'
import React, { useContext, useEffect, useRef, useState } from 'react'

const rtcOptions = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }

export default function Viewer({ username }) {
  const socket = useContext(SocketContext)
  const { roomId } = useParams()
  const { user } = getUserSync()
  const [border, setBorder] = useState('')
  const viewerRef = useRef()

  useEffect(() => {
    const socket = io('http://foghorn-api.bken.io:3200')
    console.log('Mounted Viewer')
    const peer = new RTCPeerConnection(rtcOptions)

    peer.ontrack = e => {
      console.log('got track')
      // @ts-ignore
      viewerRef.current.srcObject = e.streams[0]

      const speechEvents = hark(e.streams[0], { threshold: -60, interval: 20 })
      speechEvents.on('speaking', function () {
        setBorder('solid #48BB78 2px')
      })
      speechEvents.on('stopped_speaking', function () {
        setBorder('')
      })
    }

    peer.onnegotiationneeded = async () => {
      const offer = await peer.createOffer()
      await peer.setLocalDescription(offer)
      socket.emit('consume', roomId, user, peer.localDescription)
    }

    socket.on('consume-response', sdp => {
      console.log('consume-response', username, sdp)
      const desc = new RTCSessionDescription(sdp)
      peer.setRemoteDescription(desc).catch(e => {
        console.error('setRemoteDescription', e)
      })
    })

    peer.addTransceiver('video', { direction: 'recvonly' })
    peer.addTransceiver('audio', { direction: 'recvonly' })
    return () => {
      peer.close()
      socket.close()
    }
  }, [])

  return (
    <Box>
      <Avatar border={border} size='sm' name={username} />
      <audio autoPlay ref={viewerRef} />
    </Box>
  )
}
