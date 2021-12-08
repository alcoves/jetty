import React from 'react'
import useUser from '../hooks/useUser'
import useRequest from '../hooks/useRequest'
import CreateHarbour from './Harbour/CreateHarbour'
import { Link as RouterDomLink } from 'react-router-dom'
import { IoHomeOutline } from 'react-icons/io5'
import { Avatar, Flex, HStack, IconButton, Link } from '@chakra-ui/react'

export default function TopNavBar(): JSX.Element {
  const { user } = useUser()
  const { data } = useRequest('http://localhost:4000/harbours')

  return (
    <Flex bg='gray.900' h='50px'>
      <Flex justify='space-between' w='100%' px='2' align='center'>
        <HStack spacing='2'>
          <Link as={RouterDomLink} to={`/`}>
            <IconButton aria-label='home' icon={<IoHomeOutline />} />
          </Link>
          {data?.payload?.harbours.map(h => {
            return (
              <Link key={h.id} as={RouterDomLink} to={`/harbours/${h.id}`}>
                <Avatar size='sm' name={h.name} />
              </Link>
            )
          })}
          <CreateHarbour />
        </HStack>
        <Avatar size='sm' name={user?.username} />
      </Flex>
    </Flex>
  )
}
