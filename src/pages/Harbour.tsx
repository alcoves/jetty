import React from 'react'
import Sidebar from '../components/Harbour/Sidebar'
import { Flex } from '@chakra-ui/react'
import { Outlet, useParams } from 'react-router-dom'

export default function Harbour(): JSX.Element {
  const { harbourId } = useParams()

  return (
    <Flex w='100%'>
      <Sidebar key={harbourId} />
      <Outlet />
    </Flex>
  )
}
