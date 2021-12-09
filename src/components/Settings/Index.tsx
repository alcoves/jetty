import React, { useState } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Menu,
  MenuList,
  MenuItem,
  VStack,
  MenuDivider,
} from '@chakra-ui/react'
import { compact } from '@apollo/client/utilities'
import Profile from './Profile'
import useUser from '../../hooks/useUser'

export default function Settings(): JSX.Element {
  const { user, logout } = useUser()
  const [component, setComponent] = useState('profile')
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        size='sm'
        w='100%'
        onClick={onOpen}
        aria-label='create-harbor'
        leftIcon={<IoSettingsOutline size='15px' />}
      >
        Settings
      </Button>

      <Modal size='full' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Flex w='25%' justify='end' px='10px'>
                <VStack>
                  <Button
                    w='150px'
                    size='sm'
                    onClick={() => setComponent('profile')}
                    variant={component === 'profile' ? 'solid' : 'ghost'}
                  >
                    Profile
                  </Button>
                  <Button onClick={logout} colorScheme='red' variant='ghost' w='150px' size='sm'>
                    Log Out
                  </Button>
                </VStack>
              </Flex>
              <Flex px='10px' w='75%'>
                {component === 'profile' && <Profile />}
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
