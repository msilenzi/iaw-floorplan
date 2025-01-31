import { Group, Modal, Skeleton, Title } from '@mantine/core'

import { useCurrentProject } from '@Project/context/CurrentProject'
import { useCurrentResource } from '@Resources/context/CurrentResource/useCurrentResource'
import { useResourceQuery } from '@Resources/hooks/useResourceQuery'

export function ViewResourceHeader() {
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()
  const { isLoading, data } = useResourceQuery(projectId, resourceId)

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
