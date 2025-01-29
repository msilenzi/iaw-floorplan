import type { UploadResourceValues } from '../types/UploadResourceForm'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentProject } from '@Project/context/CurrentProject'

import { getProjectResourcesQueryKey } from './useProjectResourcesQuery'

export function useProjectResourceUploadMutation() {
  const { projectId } = useCurrentProject()
  const { projectsResourcesApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn({ file, name }: UploadResourceValues) {
      if (file == null) throw new Error('File is required')
      await projectsResourcesApi.create(projectId, file, name)
    },
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: getProjectResourcesQueryKey(projectId),
      })
    },
  })
}
