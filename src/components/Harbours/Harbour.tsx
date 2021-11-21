import Layout from '../Layout'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { Flex, Heading } from '@chakra-ui/react'
import { GET_HARBOUR } from '../../graphql/schema'

export default function Harbour() {
  const { harbourId } = useParams()
  const [executeQuery, { data, loading, error }] = useLazyQuery(GET_HARBOUR)

  useEffect(() => {
    if (harbourId) {
      executeQuery({ variables: { _id: harbourId } })
    }
  }, [harbourId])

  return (
    <Layout>
      <Flex h='100%' direction='row' bg='gray.800'>
        <Flex w='220px' h='100%' bg='gray.700' p='2'>
          <Heading size='sm'>{data?.getHarbour?.name}</Heading>
        </Flex>
      </Flex>
    </Layout>
  )
}
