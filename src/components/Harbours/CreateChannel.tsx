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
import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { IoAddOutline } from 'react-icons/io5'
import { CREATE_CHANNEL } from '../../graphql/schema'

export default function CreateChannel({
  harbourId,
  refetch,
}: {
  harbourId: string
  refetch: () => void
}): JSX.Element {
  const [name, setName] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_CHANNEL)

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
          <ModalHeader>Create a channel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text> A channel is a place to send and recieve messages</Text>
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
                mutateFunction({ variables: { input: { name, harbourId } } })
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
