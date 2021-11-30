import useUser from '../../hooks/useUser'
import React, { useEffect } from 'react'
// import { useDropzone } from 'react-dropzone'
import { Center, Avatar } from '@chakra-ui/react'

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

  if (!loading && authenticated) {
    return (
      <div>here</div>
      // <Center cursor='pointer' borderRadius='50%' {...getRootProps()}>
      //   <input {...getInputProps()} />
      //   <Avatar size='lg' name={user.username} />
      // </Center>
    )
  }

  return null
}
