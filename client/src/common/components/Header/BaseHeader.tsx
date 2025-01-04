import { Container, Group, Title } from '@mantine/core'

import classes from './BaseHeader.module.css'

type BaseHeaderProps = {
  children: React.ReactNode
}

export function BaseHeader({ children }: BaseHeaderProps) {
  return (
    <header className={classes.header}>
      <Container size="md">
        <Group justify="space-between">
          <Title order={3}>Floorplan</Title>
          {children}
        </Group>
      </Container>
    </header>
  )
}
