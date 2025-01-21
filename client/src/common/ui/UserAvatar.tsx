import { useState } from 'react'

import type { AvatarProps, ElementProps } from '@mantine/core'
import { Avatar } from '@mantine/core'

type Props = {
  username: string
  picture?: string
} & AvatarProps &
  ElementProps<'div', keyof AvatarProps>

type UserAvatarProps = Omit<Props, 'src' | 'alt' | 'onError' | 'color' | 'name'>

export function UserAvatar({ username, picture, ...props }: UserAvatarProps) {
  const [pictureError, setPictureError] = useState(false)

  if (picture == null || picture === '' || pictureError) {
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
