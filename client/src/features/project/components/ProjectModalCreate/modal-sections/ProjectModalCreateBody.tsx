import {
  Box,
  Container,
  Flex,
  Group,
  Modal,
  Stack,
  Switch,
  Title,
} from '@mantine/core'

import { ProjectBackgroundField } from '../fields/ProjectBackgroundField'
import { ProjectDesignersField } from '../fields/ProjectDesignersField'
import { ProjectLocationField } from '../fields/ProjectLocationField'
import { ProjectNameField } from '../fields/ProjectNameField'
import { ProjectOtherRequirementsField } from '../fields/ProjectOtherRequirementsField'
import { ProjectOwnerField } from '../fields/ProjectOwnerField'
import { ProjectPurposeField } from '../fields/ProjectPurposeField'
import { ProjectRecordField } from '../fields/ProjectRecordField'
import { ProjectReferencesField } from '../fields/ProjectReferencesField'
import { ProjectStatusField } from '../fields/ProjectStatusField'
import { ProjectTechnicalDirectorsField } from '../fields/ProjectTechnicalDirectorsField'
import { ProjectTypeField } from '../fields/ProjectTypeField'

export function ProjectModalCreateBody() {
  return (
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
      <Stack gap="sm">
        {title && <Title order={4}>{title}</Title>}
        {children}
      </Stack>
    </Box>
  )
}
