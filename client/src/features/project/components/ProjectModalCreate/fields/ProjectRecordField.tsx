import { Text, TextInput } from '@mantine/core'

import { useCreateProjectForm } from '@/features/project/context/CreateProjectForm'

import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'
import { useOrganizationStore } from '@Organization/store/useOrganizationStore'

export function ProjectRecordField() {
  const organizationId = useOrganizationStore((s) => s.organizationId)
  const { data: organization, isLoading } = useOrganizationQuery(organizationId)

  const form = useCreateProjectForm()

  return (
    <TextInput
      label="Expediente"
      description={
        isLoading || !organization ? (
          'Patrón: ...'
        ) : (
          <>
            Patrón:{' '}
            <Text span ff="monospace" fz="xs">
              {organization.recordRegex}
            </Text>
          </>
        )
      }
      withAsterisk
      placeholder="Nro. expediente"
      key={form.key('record')}
      {...form.getInputProps('record')}
    />
  )
}
