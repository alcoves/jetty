import hark from 'hark'
import Layout from './Layout'
import SubscribeVoiceModule from './SubscribeVoiceModule'
import { Avatar, Flex, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { getUserSync } from '../hooks/useUser'
import { SocketContext } from '../contexts/socket'
import React, { useContext, useEffect, useRef, useState } from 'react'

const rtcOptions = { iceServers: [{ urls: 'stun:stun.stunprotocol.org' }] }

export default function Room(): JSX.Element {
  const srcRef = useRef()
  const { user } = getUserSync()
  const { roomId } = useParams()
  const [users, setUsers] = useState([])
  const [border, setBorder] = useState('')
  const socket = useContext(SocketContext)

  useEffect(() => {
    socket.on('users', users => setUsers(users || []))

    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
      // @ts-ignore
      srcRef.current.srcObject = stream
      const peer = new RTCPeerConnection(rtcOptions)
      peer.onnegotiationneeded = async () => {
        const offer = await peer.createOffer()
        await peer.setLocalDescription(offer)
        socket.emit('join', roomId, user, peer.localDescription)
      }

      socket.on('broadcast-response', sdp => {
        console.log('broadcast-response', sdp)
        const desc = new RTCSessionDescription(sdp)
        peer.setRemoteDescription(desc).catch(e => console.log(e))
      })

      const speechEvents = hark(stream, { threshold: -60, interval: 20 })
      speechEvents.on('speaking', function () {
        setBorder('solid #48BB78 2px')
      })
      speechEvents.on('stopped_speaking', () => {
        setBorder('')
      })

      stream.getTracks().forEach(track => peer.addTrack(track, stream))
    })

    return () => {
      socket.emit('leave', roomId, user)
    }
  }, [])

  return (
    <Layout>
      <Flex p='4' direction='column'>
        <Flex justify='start' align='center' my='1'>
          <Avatar border={border} size='sm' name={user.username} />
          <Text ml='2' fontSize='.8rem'>
            {user.username}
          </Text>
          <audio ref={srcRef} autoPlay muted />
        </Flex>
        {users.map(({ id, username }) => {
          return (
            <Flex key={id} justify='start' align='center' my='1'>
              {id !== user.id && (
                <>
                  <SubscribeVoiceModule username={username} />
                  <Text ml='2' fontSize='.8rem'>
                    {username}
                  </Text>
                </>
              )}
            </Flex>
          )
        })}
      </Flex>
    </Layout>
  )
}
