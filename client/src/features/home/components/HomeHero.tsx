import { Button, Container, Text, Title } from '@mantine/core'

import classes from './HomeHero.module.css'

export default function HomeHero() {
  return (
    <div className={classes.wrapper}>
      <Container className={classes.inner}>
        <Text fw={900} tt="uppercase" c="dimmed" size="xl" pb="xs">
          Floorplan
        </Text>
        <Title className={classes.title}>
          Gestiona tus{' '}
          <Text
            component="span"
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
        <Button
          size="xl"
          w="fit-content"
          className={classes.control}
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
        >
          Comenzar
        </Button>
      </Container>
    </div>
  )
}
