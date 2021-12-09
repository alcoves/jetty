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
} from '@chakra-ui/react'
import useLazyRequest from '../../hooks/useLazyRequest'
import React, { useEffect, useState } from 'react'
import { IoAddOutline } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import { apiUrl } from '../../config/api'

export default function CreateChannel(): JSX.Element {
  const { harborId } = useParams()
  const [name, setName] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [createChannel, { data, loading, error }] = useLazyRequest(
    `${apiUrl}/harbors/${harborId}/channels`,
    { method: 'post' }
  )

  useEffect(() => {
    if (data) onClose()
  }, [data])

  if (!harborId) return null

  return (
    <Box>
      <Button
        w='100%'
        size='sm'
        onClick={onOpen}
        aria-label='create-channel'
        leftIcon={<IoAddOutline size='25px' />}
      >
        Channel
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a channel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text> A channel is a place to send and recieve messages</Text>
            {error && <Text color='brand.red'>{error.message}</Text>}
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
                createChannel({ name })
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
