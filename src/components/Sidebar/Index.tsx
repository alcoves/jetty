import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { Flex } from '@chakra-ui/react'
import CreateChannel from '../Harbours/CreateChannel'
import ChannelList from '../Harbours/ChannelList'
import { GET_HARBOUR } from '../../graphql/schema'
import Chooser from './Chooser'
import Settings from '../Settings/Index'

export default function Sidebar() {
  const { harbourId } = useParams()
  const [executeQuery, { data, refetch }] = useLazyQuery(GET_HARBOUR)

  useEffect(() => {
    if (harbourId) {
      executeQuery({ variables: { id: harbourId } })
    }
  }, [harbourId])

  return (
    <Flex
      p='2'
      h='100%'
      w='220px'
      minW='220px'
      bg='gray.800'
      direction='column'
      alignItems='stretch'
      justify='space-between'
    >
      <Flex direction='column'>
        <Chooser />
        <CreateChannel harbourId={harbourId} refetch={refetch} />
        <ChannelList harbourId={harbourId} channels={data?.getHarbour?.channels} />
      </Flex>
      <Flex>
        <Settings />
      </Flex>
    </Flex>
  )
}
