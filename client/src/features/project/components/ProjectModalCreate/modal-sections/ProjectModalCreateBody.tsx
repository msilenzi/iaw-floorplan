import { Box, Container, Flex, Modal, Stack, Title } from '@mantine/core'

import { FormSectionHeader } from '../FormSectionHeader'
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
            <FormSection>
              <FormSectionHeader title="Información general" />
              <ProjectRecordField />
              <ProjectNameField />
              <ProjectTypeField />
              <ProjectPurposeField />
              <ProjectLocationField />
              <ProjectStatusField />
              <ProjectBackgroundField />
            </FormSection>
            <FormSection>
              <ProjectReferencesField />
            </FormSection>
            <FormSection>
              <ProjectOtherRequirementsField />
            </FormSection>
          </Stack>

          <Stack flex={1} miw={350} gap="lg">
            <FormSection>
              <ProjectOwnerField />
            </FormSection>

            <FormSection>
              <ProjectDesignersField />
            </FormSection>

            <FormSection>
              <ProjectTechnicalDirectorsField />
            </FormSection>
          </Stack>
        </Flex>
      </Container>
    </Modal.Body>
  )
}

type FormSectionProps = {
  children: React.ReactNode
}

function FormSection({ children }: FormSectionProps) {
  return (
    <Box
      bg="dark.7"
      bd="none"
      style={{ borderRadius: 'var(--mantine-radius-md)' }}
      p="md"
      variant="filled"
    >
      <Stack gap="sm">{children}</Stack>
    </Box>
  )
}
