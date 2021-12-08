// import hark from 'hark'
// import Layout from './Layout'
// import { useParams } from 'react-router-dom'
// import { getUserSync } from '../hooks/useUser'
// import { SocketContext } from '../contexts/socket'
// import { Avatar, Flex, Text } from '@chakra-ui/react'
// import SubscribeVoiceModule from './SubscribeVoiceModule'
// import React, { useContext, useEffect, useRef, useState } from 'react'

// const rtcOptions = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }

// export default function Room(): JSX.Element {
//   const srcRef = useRef()
//   const { user } = getUserSync()
//   const { roomId } = useParams()
//   const [users, setUsers] = useState([])
//   const { socket } = useContext(SocketContext)
//   const [border, setBorder] = useState('')

//   useEffect(() => {
//     socket.on('users', users => setUsers(users || []))
//     const peer = new RTCPeerConnection(rtcOptions)

//     navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
//       // @ts-ignore
//       srcRef.current.srcObject = stream
//       peer.onnegotiationneeded = async () => {
//         console.log('negotiation needed')
//         const offer = await peer.createOffer()
//         await peer.setLocalDescription(offer)
//         socket.emit('join', roomId, user, peer.localDescription)
//       }

//       socket.on('broadcast-response', sdp => {
//         console.log('broadcast-response', sdp)
//         const desc = new RTCSessionDescription(sdp)
//         peer.setRemoteDescription(desc).catch(e => console.log(e))
//       })

//       const speechEvents = hark(stream, { threshold: -60, interval: 20 })
//       speechEvents.on('speaking', function (): JSX.Element {
//         setBorder('solid #48BB78 2px')
//       })
//       speechEvents.on('stopped_speaking', () => {
//         setBorder('')
//       })

//       stream.getTracks().forEach(track => peer.addTrack(track, stream))
//     })

//     return () => {
//       peer.close()
//       socket.emit('leave', roomId, user)
//       socket.off('broadcast-response')
//       socket.off('users')
//     }
//   }, [])

//   return (
//     <Layout>
//       <Flex p='4' direction='column'>
//         <Flex justify='start' align='center' my='1'>
//           <Avatar border={border} size='sm' name={user.username} />
//           <Text ml='2' fontSize='.8rem'>
//             {user.username}
//           </Text>
//           <audio ref={srcRef} autoPlay muted />
//         </Flex>
//         {users.map(({ id, username }) => {
//           return (
//             <Flex key={id} justify='start' align='center' my='1'>
//               {id !== user.id && (
//                 <>
//                   <SubscribeVoiceModule username={username} />
//                   <Text ml='2' fontSize='.8rem'>
//                     {username}
//                   </Text>
//                 </>
//               )}
//             </Flex>
//           )
//         })}
//       </Flex>
//     </Layout>
//   )
// }
