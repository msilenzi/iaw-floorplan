import { Text } from '@mantine/core'

import { BasicOrganizationDto } from '@Common/api/generated'

type LastAccessedAtTdProps = {
  value: BasicOrganizationDto['lastAccessedAt']
}

export function LastAccessedAtTd({ value }: LastAccessedAtTdProps) {
  if (value) return new Date(value).toLocaleDateString('es-ES')
  return (
    <Text span size="sm" c="dimmed" fs="italic">
      No accedido
    </Text>
  )
}
