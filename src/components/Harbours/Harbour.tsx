import Layout from '../Layout'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { Flex, Heading } from '@chakra-ui/react'
import { GET_HARBOUR } from '../../graphql/schema'
import CreateChannel from './CreateChannel'
import TextChannel from './TextChannel'
import ChannelList from './ChannelList'

export default function Harbour() {
  const { harbourId, channelId } = useParams()
  const [executeQuery, { data, loading, error, refetch }] = useLazyQuery(GET_HARBOUR)

  useEffect(() => {
    if (harbourId) {
      executeQuery({ variables: { _id: harbourId } })
    }
  }, [harbourId])

  return (
    <Layout>
      <Flex h='100%' direction='row' bg='gray.800'>
        <Flex direction='column' minW='220px' w='220px' h='100%' bg='gray.700' p='2'>
          <Heading mb='2' size='sm'>
            {data?.getHarbour?.name}
          </Heading>
          <CreateChannel harbourId={harbourId} refetch={refetch} />
          <ChannelList harbourId={harbourId} channels={data?.getHarbour?.channels} />
        </Flex>
        {channelId && <TextChannel id={channelId} />}
      </Flex>
    </Layout>
  )
}
