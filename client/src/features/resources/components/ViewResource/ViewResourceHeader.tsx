import { CloseButton, Group, Modal, Skeleton, Title } from '@mantine/core'
import { IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react'

import { useResourceQuery } from '@Resources/hooks/useResourceQuery'

type ViewResourceHeaderProps = {
  sidebarOpened: boolean
  setSidebarOpened: (val: boolean | ((prevState: boolean) => boolean)) => void
}

export function ViewResourceHeader({
  sidebarOpened,
  setSidebarOpened,
}: ViewResourceHeaderProps) {
  const { isLoading, data } = useResourceQuery()

  const Icon = sidebarOpened ? IconChevronsLeft : IconChevronsRight

  return (
    <Group align="center" justify="space-between" wrap="nowrap" p="sm">
      <CloseButton
        icon={<Icon stroke={1.5} />}
        onClick={() => setSidebarOpened((prev) => !prev)}
      />
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
