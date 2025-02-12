import type { UploadResourceValues } from '../types/UploadResourceForm'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'
import { useCurrentProject } from '@Project/context/CurrentProject'

import { getResourcesQueryKey } from './useResourcesQuery'

export function useResourceUploadMutation() {
  const { organizationId } = useCurrentOrganization()
  const { projectId } = useCurrentProject()
  const { resourcesApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn({ file, name }: UploadResourceValues) {
      if (file == null) throw new Error('File is required')
      await resourcesApi.create(projectId, file, name)
    },
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: getResourcesQueryKey(organizationId, projectId),
        exact: true,
      })
    },
  })
}
