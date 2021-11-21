import Layout from '../Layout'
import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Box, Flex, Text } from '@chakra-ui/react'
// import { GET_CHANNEL_MESSAGES } from '../../graphql/schema'

export default function Harbour({ id }: { id: string }) {
  // const { data, loading, error } = useQuery(GET_CHANNEL_MESSAGES, { variables: { _id: id } })

  return (
    <Flex>
      I am a text channel! {id}
      {/* {data.getChannelMessages.map(message => {
        return (
          <Box key={message._id}>
            <Text>{message.content}</Text>
          </Box>
        )
      })} */}
    </Flex>
  )
}
