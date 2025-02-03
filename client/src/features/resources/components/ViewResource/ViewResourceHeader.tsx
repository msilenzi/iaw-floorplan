import { Group, Modal, Skeleton, Title } from '@mantine/core'

import { useResourceQuery } from '@Resources/hooks/useResourceQuery'

export function ViewResourceHeader() {
  const { isLoading, data } = useResourceQuery()

  return (
    <Group align="baseline" justify="space-between" wrap="nowrap" p="sm">
      <Skeleton
        visible={isLoading}
        maw={'100%'}
        style={{ overflowWrap: 'break-word', overflow: 'hidden' }}
      >
        <Title
          order={2}
          component="h2"
          flex={1}
          maw={'100%'}
          style={{ overflowWrap: 'break-word', overflow: 'hidden' }}
        >
          {data?.name ?? 'Recurso'}
        </Title>
      </Skeleton>
      <Modal.CloseButton />
    </Group>
  )
}
