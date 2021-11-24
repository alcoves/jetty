import React, { useEffect, useState } from 'react'
import {
  Button,
  Avatar,
  Flex,
  Heading,
  Link,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  MenuDivider,
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { GET_HARBOURS } from '../../graphql/schema'
import { useParams, Link as RouterDomLink } from 'react-router-dom'
import CreateHarbour from '../CreateHarbour'

export default function Chooser() {
  const { harbourId } = useParams()
  const { data, loading, refetch } = useQuery(GET_HARBOURS)
  const [headerText, setSelectedHarbour] = useState('Home')

  useEffect(() => {
    if (harbourId && data?.getHarbours.length) {
      const currentHarbour = data?.getHarbours.filter(harbour => {
        return harbour.id === harbourId
      })
      if (currentHarbour?.length) {
        setSelectedHarbour(currentHarbour[0].name)
      }
    }
  }, [harbourId, data])

  if (loading) return null

  return (
    <Flex>
      <Menu>
        <MenuButton w='100%' as={Button} mb='10px'>
          <Heading size='xs' isTruncated={true}>
            {headerText}
          </Heading>
        </MenuButton>
        <MenuList>
          <CreateHarbour refetch={refetch} />
          <Link as={RouterDomLink} to={`/`}>
            <MenuItem minH='48px'>Home</MenuItem>
          </Link>
          <MenuDivider />
          {data?.getHarbours?.map(harbour => {
            return (
              <Link key={harbour.id} as={RouterDomLink} to={`/harbours/${harbour.id}`}>
                <MenuItem minH='48px'>
                  <Avatar size='sm' src={harbour.image} name={harbour.name[0]} />
                  <Heading ml='10px' size='xs'>
                    {harbour.name}
                  </Heading>
                </MenuItem>
              </Link>
            )
          })}
        </MenuList>
      </Menu>
    </Flex>
  )
}
