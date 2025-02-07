import type { CropWithUrl, ResourcesFindAllDto } from '@Common/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { getProjectCropsQueryKey } from '@Crops/hooks/useProjectCropsQuery'

import { getResourceQueryKey } from './useResourceQuery'
import { getResourcesQueryKey } from './useResourcesQuery'

export function useResourceDeleteMutation() {
  const { organizationId } = useCurrentOrganization()
  const { projectId } = useCurrentProject()
  const { resourcesApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(resourceId: string) {
      await resourcesApi.remove(resourceId)
      return resourceId // Pasar el id eliminado a onSuccess
    },
    onSuccess(deletedId) {
      queryClient.removeQueries({
        queryKey: getResourceQueryKey(organizationId, projectId, deletedId),
      })

      if (
        queryClient.getQueryData(
          getResourcesQueryKey(organizationId, projectId),
        ) != undefined
      ) {
        queryClient.setQueryData(
          getResourcesQueryKey(organizationId, projectId),
          (oldData: ResourcesFindAllDto[]) =>
            oldData.filter(({ _id }) => deletedId !== _id),
        )
      }

      if (
        queryClient.getQueryData(
          getProjectCropsQueryKey(organizationId, projectId),
        ) != undefined
      ) {
        queryClient.setQueryData(
          getProjectCropsQueryKey(organizationId, projectId),
          (oldData: CropWithUrl[]) =>
            oldData.filter(({ resourceId }) => deletedId !== resourceId),
        )
      }
    },
  })
}
