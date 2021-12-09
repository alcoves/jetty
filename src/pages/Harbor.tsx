import React from 'react'
import Sidebar from '../components/Harbor/Sidebar'
import { Flex } from '@chakra-ui/react'
import { Outlet, useParams } from 'react-router-dom'

export default function Harbor(): JSX.Element {
  const { harborId } = useParams()

  return (
    <Flex w='100%'>
      <Sidebar key={harborId} />
      <Outlet />
    </Flex>
  )
}
