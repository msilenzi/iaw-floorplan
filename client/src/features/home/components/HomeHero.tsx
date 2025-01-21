import { useAuth0 } from '@auth0/auth0-react'
import {
  Container,
  Paper,
  Text,
  Title,
  useComputedColorScheme,
  useMantineTheme,
} from '@mantine/core'

import { PrimaryButton } from '@Common/ui/PrimaryButton'

import classes from './HomeHero.module.css'

export function HomeHero() {
  const { loginWithRedirect } = useAuth0()

  const theme = useMantineTheme()
  const colorScheme = useComputedColorScheme()

  const bgColor =
    colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1]

  return (
    <Paper shadow="sm" bg={bgColor}>
      <Container className={classes.inner}>
        <Text fw={900} tt="uppercase" c="dimmed" size="xl" pb="xs">
          Floorplan
        </Text>
        <Title className={classes.title}>
          Gestiona tus{' '}
          <Text
            span
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            inherit
          >
            proyectos de construcción
          </Text>{' '}
          de forma eficiente
        </Title>
        <Text className={classes.description} c="dimmed">
          Centralizá el control de tus planos, proyectos y organizaciones.
          Aprovechá el poder de nuestra IA para descomponer tus planos en
          segundos.
        </Text>
        <PrimaryButton
          size="xl"
          w="fit-content"
          className={classes.control}
          onClick={() => void loginWithRedirect()}
        >
          Comenzar
        </PrimaryButton>
      </Container>
    </Paper>
  )
}
