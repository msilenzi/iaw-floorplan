import type { TextProps } from '@mantine/core'

import { Skeleton, Stack, Text } from '@mantine/core'

import { useProjectQuery } from '@Project/hooks/useProjectQuery'

type InfoItemProps = {
  label: string
  data?: string | React.ReactNode
  dataProps?: TextProps
}

export function InfoItem({ label, data, dataProps }: InfoItemProps) {
  const { isLoading } = useProjectQuery()

  if (!isLoading && data == null) return null

  return (
    <Stack gap="0.1rem">
      <Text fz="sm" c="dimmed" fw={700}>
        {label}
      </Text>
      <Skeleton visible={isLoading} h={isLoading ? '1.5rem' : undefined}>
        {typeof data === 'string' ? <Text {...dataProps}>{data}</Text> : data}
      </Skeleton>
    </Stack>
  )
}
