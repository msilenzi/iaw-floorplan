import { Container, Group } from '@mantine/core'

import classes from './BaseNavbar.module.css'

type GenericNavbarProps = {
  children: React.ReactNode
}

export default function BaseNavbar({ children }: GenericNavbarProps) {
  return (
    <header className={classes.header}>
      <Container size="md">
        <Group justify="space-between">{children}</Group>
      </Container>
    </header>
  )
}
