import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Modal,
  Stack,
  Switch,
  Title,
} from '@mantine/core'

import { IconPlus } from '@tabler/icons-react'

import { PrimaryButton } from '@Common/ui/PrimaryButton'

import { ProjectBackgroundField } from './fields/ProjectBackgroundField'
import { ProjectDesignersField } from './fields/ProjectDesignersField'
import { ProjectLocationField } from './fields/ProjectLocationField'
import { ProjectNameField } from './fields/ProjectNameField'
import { ProjectOtherRequirementsField } from './fields/ProjectOtherRequirementsField'
import { ProjectOwnerField } from './fields/ProjectOwnerField'
import { ProjectPurposeField } from './fields/ProjectPurposeField'
import { ProjectRecordField } from './fields/ProjectRecordField'
import { ProjectReferencesField } from './fields/ProjectReferencesField'
import { ProjectStatusField } from './fields/ProjectStatusField'
import { ProjectTechnicalDirectorsField } from './fields/ProjectTechnicalDirectorsField'
import { ProjectTypeField } from './fields/ProjectTypeField'

type ProjectModalCreateProps = {
  isOpen: boolean
  onClose: () => void
}

export function ProjectModalCreate({
  isOpen,
  onClose,
}: ProjectModalCreateProps) {
  function handleClose() {
    // TODO: si el formulario tiene campos editados mostrar una alerta
    onClose()
  }

  return (
    <Modal.Root opened={isOpen} onClose={handleClose} fullScreen>
      <Modal.Content bg="dark.8">
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
                >
                  Crear
                </PrimaryButton>
              </Group>
            </Group>
          </Container>
        </Modal.Header>

        <Modal.Body>
          <Container size="md" mt="xs">
            <Flex direction="row" wrap="wrap" gap="lg">
              <Stack flex={1} miw={350} gap="lg">
                <FormSection title="Información general">
                  <ProjectRecordField />
                  <ProjectNameField />
                  <ProjectTypeField />
                  <ProjectPurposeField />
                  <ProjectLocationField />
                  <ProjectStatusField />
                  <ProjectBackgroundField />
                </FormSection>
                <FormSection title="Referencias">
                  <ProjectReferencesField />
                </FormSection>
                <FormSection title="Otras exigencias">
                  <ProjectOtherRequirementsField />
                </FormSection>
              </Stack>

              <Stack flex={1} miw={350} gap="lg">
                <FormSection>
                  <Group justify="space-between">
                    <Title order={4}>Propietario</Title>
                    <Switch />
                  </Group>
                  <ProjectOwnerField />
                </FormSection>

                <FormSection title="Proyectistas">
                  <ProjectDesignersField />
                </FormSection>

                <FormSection title="Dirección técnica">
                  <ProjectTechnicalDirectorsField />
                </FormSection>
              </Stack>
            </Flex>
          </Container>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}

type FormSectionProps = {
  title?: string
  children: React.ReactNode
}

function FormSection({ title, children }: FormSectionProps) {
  return (
    <Box
      bg="dark.7"
      bd="none"
      style={{ borderRadius: 'var(--mantine-radius-md)' }}
      p="md"
      variant="filled"
    >
      <Stack gap="0.5rem">
        {title && <Title order={4}>{title}</Title>}
        {children}
      </Stack>
    </Box>
  )
}
