import {
  Modal,
  Avatar,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
  Flex,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  ModalBody,
  Heading,
} from '@chakra-ui/react'
import React from 'react'
import useUser from '../../hooks/useUser'
import Account from './Account'

function StyledTab({ title }: { title: string }) {
  return (
    <Tab my='1px' w='100%' rounded='md' _selected={{ bg: 'teal.500' }}>
      <Heading size='xs'>{title}</Heading>
    </Tab>
  )
}

export default function Settings() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, loading, authenticated } = useUser()

  if (loading || !authenticated) return null

  return (
    <>
      <Avatar onClick={onOpen} cursor='pointer' size='sm' name={user.username} src={user.image} />
      <Modal size='full' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs orientation='vertical' variant='unstyled'>
              <TabList as={Flex} align='start' w='240px'>
                <StyledTab title='Account' />
                <StyledTab title='Debug' />
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Account />
                </TabPanel>
                <TabPanel>Debug information</TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
