import type { ProjectCreateDto } from '@Common/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'

import { PROJECTS_QUERY_KEY } from './useProjectsQuery'

export function useCreateProjectMutation(organizationId: string) {
  const { projectsApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(dto: ProjectCreateDto) {
      return (await projectsApi.create(organizationId, dto)).data
    },
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: [PROJECTS_QUERY_KEY, organizationId],
      })
    },
  })
}
