import {
  Box,
  Button,
  IconButton,
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
} from '@chakra-ui/react'
import useUser from '../hooks/useUser'
import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { IoAddOutline } from 'react-icons/io5'
import { CREATE_HARBOUR } from '../graphql/schema'

export default function CreateHarbour({ refetch }: { refetch: () => void }): JSX.Element {
  const { user, authenticated } = useUser()
  const [name, setName] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_HARBOUR)

  useEffect(() => {
    if (authenticated) {
      const parsedUsername = user?.username.charAt(0).toUpperCase() + user?.username.slice(1)
      const newHarbourPlaceholder = `${parsedUsername}'s Harbour`
      setName(newHarbourPlaceholder)
    }
  }, [authenticated])

  useEffect(() => {
    if (data) {
      onClose()
      refetch()
    }
  }, [data])

  return (
    <Box>
      <IconButton
        w='60px'
        h='30px'
        onClick={onOpen}
        aria-label='create-harbour'
        icon={<IoAddOutline size='20px' />}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a harbour</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text> A harbour a place your you and your friends.</Text>
            {error && <Text color='red.500'>{error.message}</Text>}
            <Input
              mt='4'
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
              isLoading={loading}
              onClick={() => {
                mutateFunction({ variables: { input: { name } } })
              }}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
