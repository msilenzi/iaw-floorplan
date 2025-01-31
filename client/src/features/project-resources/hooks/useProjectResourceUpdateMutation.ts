import type { ResourceUpdateDto } from '@Common/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentProject } from '@Project/context/CurrentProject'

import { getProjectResourcesQueryKey } from './useProjectResourcesQuery'

export function useProjectResourceUpdateMutation(resourceId: string) {
  const { projectId } = useCurrentProject()
  const { resourcesApi: projectsResourcesApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(dto: ResourceUpdateDto) {
      return await projectsResourcesApi.update(resourceId, projectId, dto)
    },
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: getProjectResourcesQueryKey(projectId),
      })
    },
  })
}
