import type { UserDto } from '@Common/api'
import type { ElementProps, TextProps } from '@mantine/core'
import type { UserAvatarProps } from './UserAvatar'

import { Group, Stack, Text } from '@mantine/core'

import { UserAvatar } from './UserAvatar'

type UserInfoProps = {
  user: UserDto
  innerProps?: {
    avatar?: Omit<UserAvatarProps, 'picture' | 'username'>
    name?: TextProps & ElementProps<'p', keyof TextProps>
    email?: TextProps & ElementProps<'p', keyof TextProps>
  }
}

export function UserInfo({ user, innerProps }: UserInfoProps) {
  return (
    <Stack gap="xs" style={{ overflow: 'hidden', flexWrap: 'nowrap' }}>
      <Group
        gap="xs"
        align="center"
        style={{ overflow: 'hidden', flexWrap: 'nowrap' }}
      >
        <UserAvatar
          size="md"
          {...innerProps?.avatar}
          picture={user.picture}
          username={user.name}
        />
        <Stack gap="0" style={{ overflow: 'hidden', flexWrap: 'nowrap' }}>
          <Text lh={1.3} truncate {...innerProps?.name}>
            {user.name}
          </Text>
          <Text c="dimmed" size="sm" lh={1.3} truncate {...innerProps?.email}>
            {user.email}
          </Text>
        </Stack>
      </Group>
    </Stack>
  )
}
