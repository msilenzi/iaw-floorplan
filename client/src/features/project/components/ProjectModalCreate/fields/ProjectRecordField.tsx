import { Text, TextInput } from '@mantine/core'

import { useCreateProjectForm } from '@/features/project/context/CreateProjectForm'

import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'
import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'

export function ProjectRecordField() {
  const { organizationId } = useCurrentOrganization()

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
