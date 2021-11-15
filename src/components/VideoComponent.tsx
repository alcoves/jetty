import { Avatar, Box, Flex, IconButton } from '@chakra-ui/react'
import React, { VideoHTMLAttributes, useEffect, useRef, useReducer, useState } from 'react'
import { IoCamera, IoCameraOutline, IoMicOffOutline, IoMicOutline } from 'react-icons/io5'

type PropsType = VideoHTMLAttributes<HTMLVideoElement> & {
  stream: MediaStream
  username: string
  muted: boolean
}

export default function VideoComponent({ muted, username, stream, ...props }: PropsType) {
  console.log('VideoComponent', stream)
  const mediaRef = useRef<HTMLVideoElement>(null)
  const [_, forceUpdate] = useReducer(x => x + 1, 0)
  // const videoEnabled = stream?.getVideoTracks()[0]?.enabled
  const audioEnabled = stream?.getAudioTracks()[0]?.enabled

  useEffect(() => {
    if (stream && mediaRef.current) {
      mediaRef.current.srcObject = stream
    }
  }, [stream])

  function toggleMute() {
    console.log('toggle mute')
    const track = stream?.getAudioTracks()[0]
    console.log('track', track)
    track.enabled = !track.enabled
    console.log('track', track)
    forceUpdate()
  }

  // function toggleVideo() {
  //   const track = stream?.getVideoTracks()[0]
  //   track.enabled = !track.enabled
  //   forceUpdate()
  // }

  // if (videoEnabled) {
  //   return <video ref={mediaRef} {...props} />
  // }

  return (
    <Flex direction='column' w='300px' h='200px' bg='gray.900' rounded='lg'>
      <Flex align='center' justify='center' m='2'>
        {/* <IconButton mx='1' onClick={toggleVideo} aria-label='camera-toggle' size='sm'>
          {videoEnabled ? <IoCamera/> : <IoCameraOutline color='red'/>}
        </IconButton> */}
        <IconButton mx='1' onClick={toggleMute} aria-label='audio-toggle' size='sm'>
          {audioEnabled ? <IoMicOutline /> : <IoMicOffOutline color='red' />}
        </IconButton>
      </Flex>
      <Flex justify='center' align='center' h='100%'>
        <Avatar border={`solid ${audioEnabled ? '#48BB78' : 'red'} 3px`} name={username} />
        {mediaRef ? <audio muted={muted} ref={mediaRef} {...props} /> : null}
      </Flex>
    </Flex>
  )
}
