import { Skeleton } from '@mantine/core'

import { BaseHeader } from './BaseHeader'

export function LoadingHeader() {
  return (
    <BaseHeader>
      <Skeleton height={30} width={100} />
    </BaseHeader>
  )
}
