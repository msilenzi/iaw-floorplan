import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { CreateProjectDto } from '@Common/api/generated'
import { useApi } from '@Common/api/useApi'

import { PROJECTS_QUERY_KEY } from './useProjectsQuery'

export function useCreateProjectMutation(organizationId: string) {
  const { projectsApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(dto: CreateProjectDto) {
      return (await projectsApi.create(organizationId, dto)).data
    },
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: [PROJECTS_QUERY_KEY, organizationId],
      })
    },
  })
}
