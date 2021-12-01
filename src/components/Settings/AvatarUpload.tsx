import useUser from '../../hooks/useUser'
import React, { useEffect } from 'react'
// import { useDropzone } from 'react-dropzone'
import { Button, Center, Avatar } from '@chakra-ui/react'

export default function AvatarUpload() {
  const { user, loading, authenticated } = useUser()

  // const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
  //   maxFiles: 1,
  //   multiple: false,
  //   accept: 'image/png, image/jpeg, image/webp',
  // })

  // useEffect(() => {
  //   acceptedFiles.map(file => (
  //     <li key={file.path}>
  //       {file.path} - {file.size} bytes
  //     </li>
  //   ))
  // }, [acceptedFiles])

  useEffect(() => {
    window['electron'].api.receive('selectAvatarFile', event => {
      console.log('selectAvatarFile', event)
    })
  }, [])

  if (!loading && authenticated) {
    return (
      <div>
        <Button
          onClick={() => {
            window['electron'].api.send('selectAvatarFile')
          }}
        >
          Click to upload
        </Button>
      </div>
      // <Center cursor='pointer' borderRadius='50%' {...getRootProps()}>
      //   <input {...getInputProps()} />
      //   <Avatar size='lg' name={user.username} />
      // </Center>
    )
  }

  return null
}
