import type { BasicOrganizationDto } from '@Common/api'

import { Text } from '@mantine/core'

type LastAccessedAtTdProps = {
  value?: BasicOrganizationDto['lastAccessedAt']
}

export function LastAccessedAtTd({ value }: LastAccessedAtTdProps) {
  if (value != null) return new Date(value).toLocaleDateString('es-ES')
  return (
    <Text span size="sm" c="dimmed" fs="italic">
      No accedido
    </Text>
  )
}
