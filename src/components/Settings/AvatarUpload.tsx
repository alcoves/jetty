import useUser from '../../hooks/useUser'
import React, { useEffect } from 'react'
import { Avatar } from '@chakra-ui/react'
import useLazyRequest from '../../hooks/useLazyRequest'

export default function AvatarUpload(): JSX.Element {
  const { user, loading, authenticated } = useUser()
  const [modifyUser, { data, loading: modifyUserLoading, error }] = useLazyRequest({
    method: 'PATCH',
    url: 'http://localhost:4000/users/@me',
  })

  useEffect(() => {
    window['electron'].api.receive('selectAvatarFile', file => {
      console.log('selectAvatarFile', file)
      // TODO :: use file.size to display en error
      modifyUser({ image: `data:${file.type};base64,${file.data}` })
      // TODO :: Re-hydrate the user so that their avatar is updated globally
    })
  }, [])

  if (!loading && authenticated) {
    return (
      <Avatar
        size='lg'
        src={user.image}
        cursor='pointer'
        name={user.username}
        _hover={{ opacity: '.9' }}
        onClick={() => {
          window['electron'].api.send('selectAvatarFile')
        }}
      />
    )
  }

  return null
}
