import { useState } from 'react'

import { useAuth0 } from '@auth0/auth0-react'

import { Avatar, Group, Menu, Text, UnstyledButton } from '@mantine/core'

import { IconChevronDown, IconLogout } from '@tabler/icons-react'

import { BaseHeader } from './BaseHeader'

import classes from './AuthenticatedHeader.module.css'

export function AuthenticatedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth0()

  return (
    <BaseHeader>
      <Menu
        width={192}
        position="bottom-end"
        shadow="md"
        transitionProps={{ transition: 'pop-top-right' }}
        onClose={() => setIsMenuOpen(false)}
        onOpen={() => setIsMenuOpen(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton
            className={`${classes.user} ${isMenuOpen ? classes.userActive : ''}`}
          >
            <Group gap="xs" align="center">
              {!user?.picture || user.picture === '' ? (
                <Avatar name={user?.name} color="initials" />
              ) : (
                <Avatar
                  src={user.picture}
                  alt={user.name}
                  radius="xl"
                  size="sm"
                />
              )}
              <Text fw={500} size="sm" className={classes.userName}>
                {user?.name}
              </Text>
              <IconChevronDown size={12} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            color="red"
            leftSection={<IconLogout size={16} stroke={1.5} />}
            onClick={() => void logout()}
          >
            Cerrar sesión
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </BaseHeader>
  )
}
