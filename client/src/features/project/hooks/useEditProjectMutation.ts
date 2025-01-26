import type { UpdateProjectDto } from '@Common/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'

import { PROJECT_QUERY_KEY } from './useProjectQuery'
import { PROJECTS_QUERY_KEY } from './useProjectsQuery'

export function useEditProjectMutation(
  organizationId: string,
  projectId: string,
) {
  const { projectsApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(data: UpdateProjectDto) {
      return await projectsApi.update(projectId, data)
    },
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: [PROJECT_QUERY_KEY, organizationId, projectId],
      })
      void queryClient.invalidateQueries({
        queryKey: [PROJECTS_QUERY_KEY, organizationId],
      })
    },
  })
}
