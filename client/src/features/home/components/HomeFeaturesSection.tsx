import {
  Card,
  Container,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'

import { floorplanFeatures } from '@Home/data/floorplan-features'

import classes from './HomeFeaturesSection.module.css'

export default function HomeFeaturesSection() {
  const theme = useMantineTheme()

  return (
    <Container size="lg" py={theme.spacing.xl}>
      <Title order={2} className={classes.title} ta="center" mt="lg">
        Por qué usar Floorplan
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Floorplan es la solución ideal para gestionar tus proyectos de
        construcción de forma eficiente y moderna. Nuestra plataforma está
        diseñada para simplificar procesos, ahorrar tiempo y maximizar la
        precisión. Floorplan te permite concentrarte en lo que realmente
        importa: llevar tus proyectos al siguiente nivel.
      </Text>

      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} spacing="xl" mt={50}>
        {floorplanFeatures.map((feature) => (
          <Card
            key={feature.title}
            shadow="md"
            radius="md"
            className={classes.card}
            padding="xl"
          >
            <feature.icon size={50} stroke={2} color={theme.colors.blue[6]} />
            <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
              {feature.title}
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
              {feature.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  )
}
