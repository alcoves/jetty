import React from 'react'
import Layout from '../components/Layout'
import TextChannel from '../components/TextChannel/Index'
import { Flex } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

export default function HarbourChannel(): JSX.Element {
  const { channelId } = useParams()
  return (
    <Layout>
      <Flex p='4' h='100%' justify='start' direction='column' align='start'>
        {/* {channelId && <TextChannel key={channelId} id={channelId} />} */}
      </Flex>
    </Layout>
  )
}
