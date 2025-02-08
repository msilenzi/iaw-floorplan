import type { ProjectBasicDto } from '@Common/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'

import { getProjectQueryKey } from './useProjectQuery'
import { getProjectsQueryKey } from './useProjectsQuery'

export function useDeleteProjectMutation() {
  const { organizationId } = useCurrentOrganization()
  const { projectsApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(projectId: string) {
      await projectsApi.remove(projectId)
      return projectId
    },
    onSuccess(deletedId) {
      queryClient.removeQueries({
        queryKey: getProjectQueryKey(organizationId, deletedId),
      })

      if (
        queryClient.getQueryData(getProjectsQueryKey(organizationId)) !=
        undefined
      ) {
        queryClient.setQueryData(
          getProjectsQueryKey(organizationId),
          (oldData: ProjectBasicDto[]) =>
            oldData.filter(({ _id }) => _id !== deletedId),
        )
      }
    },
  })
}
