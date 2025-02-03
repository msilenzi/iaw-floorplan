import { Text, TextInput } from '@mantine/core'

import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'
import { useProjectForm } from '@Project/context/ProjectForm'

export function ProjectRecordField() {
  const { data: organization, isLoading } = useOrganizationQuery()
  const form = useProjectForm()

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
