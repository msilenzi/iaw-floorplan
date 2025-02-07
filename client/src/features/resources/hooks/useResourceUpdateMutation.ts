import type { ResourceUpdateDto } from '@Common/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'
import { useCurrentProject } from '@Project/context/CurrentProject'

import { getResourcesQueryKey } from './useResourcesQuery'

type MutationFnArgs = {
  resourceId: string
  dto: ResourceUpdateDto
}

export function useResourceUpdateMutation() {
  const { organizationId } = useCurrentOrganization()
  const { projectId } = useCurrentProject()
  const { resourcesApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn({ resourceId, dto }: MutationFnArgs) {
      return await resourcesApi.update(resourceId, dto)
    },
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: getResourcesQueryKey(organizationId, projectId),
        exact: true,
      })
    },
  })
}
