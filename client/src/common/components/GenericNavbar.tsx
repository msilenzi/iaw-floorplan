import { Container, Group } from '@mantine/core'

import classes from './GenericNavbar.module.css'

export default function GenericNavbar({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <header className={classes.header}>
      <Container size="md">
        <Group justify="space-between">{children}</Group>
      </Container>
    </header>
  )
}
