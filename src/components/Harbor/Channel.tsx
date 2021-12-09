import React from 'react'
import TextChannel from '../TextChannel/Index'
import { Flex } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

export default function HarborChannel(): JSX.Element {
  const { channelId } = useParams()
  return (
    <Flex p='4' pt='0' w='100%' justify='start' direction='column' align='start'>
      {channelId && <TextChannel key={channelId} id={channelId} />}
    </Flex>
  )
}
