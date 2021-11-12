import { Flex } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

export default function UserVideo() {
  const [userVideoFeed, setUserVideoFeed] = useState()

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          channelCount: 1,
          autoGainControl: true,
          noiseSuppression: true,
          sampleRate: 44000,
          echoCancellation: true,
        },
        video: true,
      })
      .then((stream) => {
        setUserVideoFeed(stream)
      })
  }, [])

  useEffect(() => {
    if (userVideoFeed) {
      const userVideoDom = document.getElementById("user-video")
      userVideoDom.srcObject = userVideoFeed
      userVideoDom.addEventListener("loadedmetadata", () => {
        userVideoDom.play()
      })
    }
  }, [userVideoFeed])

  return (
    <Flex>
      <video muted id='user-video' />
    </Flex>
  )
}