import { Container } from '@mantine/core'

type SectionContainerProps = {
  children: React.ReactNode
}

export function SectionContainer({ children }: SectionContainerProps) {
  return (
    <Container size="md" mt="3rem">
      {children}
    </Container>
  )
}
