import React from 'react'
import { useQuery } from '@apollo/client'
import CreateHarbour from './CreateHarbour'
import { GET_HARBOURS } from '../graphql/schema'
import { Link as RouterDomLink } from 'react-router-dom'
import { Avatar, Flex, IconButton, Link, VStack } from '@chakra-ui/react'
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5'

export default function Sidebar(): JSX.Element {
  const { loading, error, data, refetch } = useQuery(GET_HARBOURS)
  console.log(error)

  return (
    <Flex justify='space-between' direction='column' width='80px' bg='gray.900' px='10px' pb='10px'>
      <Flex justify='center' align='center' direction='column'>
        <Link as={RouterDomLink} to='/'>
          <IconButton
            mb='10px'
            size='sm'
            w='60px'
            h='60px'
            variant='ghost'
            aria-label='create-harbour'
            icon={<IoHomeOutline size='20px' />}
          />
        </Link>
        <Flex>
          {data?.getHarbours?.map(harbour => {
            return (
              <Link key={harbour._id} as={RouterDomLink} to={`/harbours/${harbour._id}`}>
                <Avatar src={harbour.image} name={harbour.name[0]} />
              </Link>
            )
          })}
        </Flex>
      </Flex>
      <VStack spacing='5px'>
        <CreateHarbour refetch={refetch} />
        <Link as={RouterDomLink} to='/settings'>
          <IconButton
            size='sm'
            w='60px'
            h='30px'
            aria-label='create-harbour'
            icon={<IoSettingsOutline size='15px' />}
          />
        </Link>
      </VStack>
    </Flex>
  )
}
