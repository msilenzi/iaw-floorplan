import type { ResourceUpdateDto } from '@Common/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentProject } from '@Project/context/CurrentProject'

import { getResourcesQueryKey } from './useResourcesQuery'

export function useResourceUpdateMutation() {
  const { projectId } = useCurrentProject()
  const { resourcesApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn({
      resourceId,
      dto,
    }: {
      resourceId: string
      dto: ResourceUpdateDto
    }) {
      return await resourcesApi.update(resourceId, dto)
    },
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: getResourcesQueryKey(projectId),
      })
    },
  })
}
