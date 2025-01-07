import { useState } from 'react'

import { Avatar, AvatarProps, ElementProps } from '@mantine/core'

interface Props extends AvatarProps, ElementProps<'div', keyof AvatarProps> {
  username: string
  picture?: string
}

type UserAvatarProps = Omit<Props, 'src' | 'alt' | 'onError' | 'color' | 'name'>

export function UserAvatar({ username, picture, ...props }: UserAvatarProps) {
  const [pictureError, setPictureError] = useState(false)

  if (!picture || picture === '' || pictureError) {
    return (
      <Avatar
        radius="xl"
        size="sm"
        {...props}
        name={username}
        color="initials"
      />
    )
  }

  return (
    <Avatar
      radius="xl"
      size="sm"
      {...props}
      src={picture}
      alt={username}
      onError={() => setPictureError(true)}
    />
  )
}
