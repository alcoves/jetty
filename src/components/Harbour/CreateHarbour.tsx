import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Input,
  IconButton,
} from '@chakra-ui/react'
import useUser from '../../hooks/useUser'
import React, { useEffect, useState } from 'react'
import { IoAdd, IoAddOutline, IoAddSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export default function CreateHarbour(): JSX.Element {
  const navigate = useNavigate()
  const { user, authenticated } = useUser()
  const [name, setName] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (authenticated) {
      const parsedUsername = user?.username.charAt(0).toUpperCase() + user?.username.slice(1)
      const newHarbourPlaceholder = `${parsedUsername}'s Harbour`
      setName(newHarbourPlaceholder)
    }
  }, [authenticated])

  // useEffect(() => {
  //   if (data) {
  //     onClose()
  //     refetch()
  //     // navigate(`/harbours/${data.createHarbour.id}`)
  //   }
  // }, [data])

  return (
    <Box>
      <IconButton
        size='sm'
        onClick={onOpen}
        borderRadius='50%'
        aria-label='create-harbour'
        icon={<IoAddSharp size='20px' />}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a harbour</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text> A harbour a place your you and your friends.</Text>
            {/* {error && <Text color='red.500'>{error.message}</Text>} */}
            <Input
              mt='4'
              autoFocus
              type='text'
              variant='filled'
              defaultValue={name}
              onChange={e => setName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              w='100%'
              variant='solid'
              // isLoading={loading}
              // onClick={() => {
              //   mutateFunction({ variables: { input: { name } } })
              // }}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
