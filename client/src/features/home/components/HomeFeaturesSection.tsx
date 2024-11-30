import { Container, SimpleGrid, Card, Text, Title } from '@mantine/core'

const features = [
  {
    title: 'Gestión de organizaciones',
    description: 'Crea y colabora en equipos.',
    icon: 'IconUsers',
  },
  {
    title: 'Proyectos estructurados',
    description:
      'Mantén cada proyecto organizado y con todos los datos necesarios.',
    icon: 'IconBuilding',
  },
  {
    title: 'Carga de planos',
    description: 'Sube planos y realiza recortes fácilmente.',
    icon: 'IconUpload',
  },
  {
    title: 'Procesamiento con IA',
    description: 'Obtén información detallada de los elementos de tus planos.',
    icon: 'IconBrain',
  },
]

export default function HomeFeaturesSection() {
  return (
    <Container>
      <Title order={2} mt="xl">
        Principales características
      </Title>
      <SimpleGrid cols={2} mt="xl" spacing="lg">
        {features.map((feature, index) => (
          <Card key={index} shadow="sm" padding="lg" radius="md">
            {/* <feature.icon size={32} stroke={1.5} /> */}
            <Title order={4} mt="md">
              {feature.title}
            </Title>
            <Text mt="sm">{feature.description}</Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  )
}
