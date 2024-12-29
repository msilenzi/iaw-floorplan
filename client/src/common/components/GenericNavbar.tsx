import { Container, Group } from '@mantine/core'

import classes from './GenericNavbar.module.css'

type GenericNavbarProps = {
  children: React.ReactNode
}

export default function GenericNavbar({ children }: GenericNavbarProps) {
  return (
    <header className={classes.header}>
      <Container size="md">
        <Group justify="space-between">{children}</Group>
      </Container>
    </header>
  )
}
