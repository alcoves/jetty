import React from 'react'
import Layout from '../components/Layout'
import { Flex, Heading, Text } from '@chakra-ui/react'

export default function Home(): JSX.Element {
  return (
    <Layout>
      <Flex p='4' h='100%' justify='start' direction='column' align='start'>
        <Heading> Ahoy there! </Heading>
        <Text> This page is under contruction </Text>
      </Flex>
    </Layout>
  )
}
