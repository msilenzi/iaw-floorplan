import { Button, Container, Group, Modal, Title } from '@mantine/core'

import { IconPlus } from '@tabler/icons-react'

import { PrimaryButton } from '@Common/ui/PrimaryButton'

type ProjectModalCreateHeaderProps = {
  handleClose: () => void
  isLoading: boolean
}

export function ProjectModalCreateHeader({
  handleClose,
  isLoading,
}: ProjectModalCreateHeaderProps) {
  return (
    <Modal.Header bg="dark.8">
      <Container size="md" w="100%">
        <Group justify="space-between">
          <Title order={2}>Crear proyecto</Title>
          <Group gap="xs">
            <Button variant="filled" color="dark.6" onClick={handleClose}>
              Cancelar
            </Button>
            <PrimaryButton
              type="submit"
              rightSection={<IconPlus size={16} stroke={2.5} />}
              loading={isLoading}
            >
              Crear
            </PrimaryButton>
          </Group>
        </Group>
      </Container>
    </Modal.Header>
  )
}
