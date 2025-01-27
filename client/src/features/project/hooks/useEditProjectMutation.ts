import type { ProjectUpdateDto } from '@Common/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'

import { getProjectQueryKey } from './useProjectQuery'
import { getProjectsQueryKey } from './useProjectsQuery'

export function useEditProjectMutation(
  organizationId: string,
  projectId: string,
) {
  const { projectsApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(data: ProjectUpdateDto) {
      return await projectsApi.update(projectId, data)
    },
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: getProjectQueryKey(organizationId, projectId),
      })
      void queryClient.invalidateQueries({
        queryKey: getProjectsQueryKey(organizationId),
      })
    },
  })
}
