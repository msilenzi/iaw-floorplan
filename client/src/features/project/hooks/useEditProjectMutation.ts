import type { ProjectUpdateDto } from '@Common/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'
import { useCurrentProject } from '@Project/context/CurrentProject'

import { getProjectQueryKey } from './useProjectQuery'
import { getProjectsQueryKey } from './useProjectsQuery'

export function useEditProjectMutation() {
  const { organizationId } = useCurrentOrganization()
  const { projectId } = useCurrentProject()
  const { projectsApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(data: ProjectUpdateDto) {
      return await projectsApi.update(projectId, data)
    },
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: getProjectQueryKey(projectId),
      })
      void queryClient.invalidateQueries({
        queryKey: getProjectsQueryKey(organizationId),
      })
    },
  })
}
