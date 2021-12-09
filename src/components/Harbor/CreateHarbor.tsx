import useUser from '../../hooks/useUser'
import useLazyRequest from '../../hooks/useLazyRequest'
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
import { IoAddSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

export default function CreateHarbor(): JSX.Element {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const { user, authenticated } = useUser()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [createHarbor, { data, loading, error }] = useLazyRequest('http://localhost:4000/harbors', {
    method: 'POST',
  })

  useEffect(() => {
    if (authenticated) {
      const parsedUsername = user?.username.charAt(0).toUpperCase() + user?.username.slice(1)
      const newHarborPlaceholder = `${parsedUsername}'s Harbor`
      setName(newHarborPlaceholder)
    }
  }, [authenticated])

  useEffect(() => {
    if (data) {
      onClose()
      navigate(`/harbors/${data?.payload?.harbor?.id}`)
    }
  }, [data])

  return (
    <Box>
      <IconButton
        size='sm'
        onClick={onOpen}
        borderRadius='50%'
        aria-label='create-harbor'
        icon={<IoAddSharp size='20px' />}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a harbor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text> A harbor is a place your you and your friends.</Text>
            {error && <Text color='red.500'>{error.message}</Text>}
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
              isLoading={loading}
              onClick={() => {
                createHarbor({ name })
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
