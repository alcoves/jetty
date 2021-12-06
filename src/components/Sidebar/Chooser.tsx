import useSWR from 'swr'
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
import { fetcher } from '../../config/fetcher'
import CreateHarbour from '../CreateHarbour'
import { useParams, Link as RouterDomLink } from 'react-router-dom'

export default function Chooser() {
  const { harbourId } = useParams()
  const [headerText, setSelectedHarbour] = useState('Home')
  const { data, error } = useSWR(`http://localhost:4000/harbours`, fetcher)

  useEffect(() => {
    if (harbourId && data?.payload?.harbours?.length) {
      const currentHarbour = data?.payload?.harbours.filter(harbour => {
        return harbour.id === harbourId
      })

      if (currentHarbour?.length) {
        setSelectedHarbour(currentHarbour[0].name)
      }
    }
  }, [harbourId, data])

  if (!data) return null
  if (error) return <div>Error</div>

  return (
    <Flex>
      <Menu>
        <MenuButton w='100%' as={Button} mb='10px'>
          <Heading size='xs' isTruncated={true}>
            {headerText}
          </Heading>
        </MenuButton>
        <MenuList>
          {/* <CreateHarbour refetch={refetch} /> */}
          <Link as={RouterDomLink} to={`/`}>
            <MenuItem minH='48px'>Home</MenuItem>
          </Link>
          <MenuDivider />
          {data?.payload?.harbours?.map(harbour => {
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
