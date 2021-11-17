import hark from 'hark'
import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Box } from '@chakra-ui/react'
import { socket } from '../contexts/socket'
import { useParams } from 'react-router-dom'
import { getUserSync } from '../hooks/useUser'

const rtcOptions = { iceServers: [{ urls: 'stun:stun.stunprotocol.org' }] }

export default function Viewer({ username }) {
  const { roomId } = useParams()
  const { user } = getUserSync()
  const [border, setBorder] = useState('')
  const viewerRef = useRef()

  useEffect(() => {
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
      console.log('consume-response', sdp)
      const desc = new RTCSessionDescription(sdp)
      peer.setRemoteDescription(desc).catch(e => console.log(e))
    })

    peer.addTransceiver('video', { direction: 'recvonly' })
    peer.addTransceiver('audio', { direction: 'recvonly' })
  }, [])

  return (
    <Box>
      <Avatar border={border} size='sm' name={username} />
      <audio autoPlay ref={viewerRef} />
    </Box>
  )
}
