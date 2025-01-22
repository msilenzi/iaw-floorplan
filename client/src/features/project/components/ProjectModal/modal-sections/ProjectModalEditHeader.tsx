import { Button, Container, Group, Modal, Title } from '@mantine/core'
import { IconPencil, IconReload } from '@tabler/icons-react'

import { PrimaryButton } from '@Common/ui/PrimaryButton'
import { useProjectForm } from '@Project/context/ProjectForm'

type ProjectModalEditHeaderProps = {
  handleClose: () => void
  isLoading: boolean
}

export function ProjectModalEditHeader({
  handleClose,
  isLoading,
}: ProjectModalEditHeaderProps) {
  const form = useProjectForm()

  return (
    <Modal.Header bg="dark.8">
      <Container size="md" w="100%">
        <Group justify="space-between">
          <Title order={2}>Editar proyecto</Title>
          <Group gap="xs">
            <Button
              variant="filled"
              color="dark.6"
              onClick={handleClose}
              loading={isLoading}
            >
              Cancelar
            </Button>

            <Button
              type="reset"
              variant="filled"
              color="dark.6"
              rightSection={<IconReload size={16} stroke={2.5} />}
              loading={isLoading}
              disabled={isLoading || !form.isDirty()}
            >
              Restablecer
            </Button>

            <PrimaryButton
              type="submit"
              rightSection={<IconPencil size={16} stroke={2.5} />}
              loading={isLoading}
              disabled={isLoading || !form.isDirty()}
            >
              Editar
            </PrimaryButton>
          </Group>
        </Group>
      </Container>
    </Modal.Header>
  )
}
