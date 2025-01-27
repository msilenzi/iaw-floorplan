import type { UserDto } from '@Common/api'

import { Group, Stack, Text } from '@mantine/core'

import { UserAvatar } from './UserAvatar'

type UserInfoProps = {
  user: UserDto
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <Stack gap="xs" style={{ overflow: 'hidden', flexWrap: 'nowrap' }}>
      <Group
        gap="xs"
        align="center"
        style={{ overflow: 'hidden', flexWrap: 'nowrap' }}
      >
        <UserAvatar picture={user.picture} username={user.name} size="md" />
        <Stack gap="0" style={{ overflow: 'hidden', flexWrap: 'nowrap' }}>
          <Text style={{ lineHeight: 1.3 }} truncate>
            {user.name}
          </Text>
          <Text style={{ lineHeight: 1.3 }} c="dimmed" size="sm" truncate>
            {user.email}
          </Text>
        </Stack>
      </Group>
    </Stack>
  )
}
