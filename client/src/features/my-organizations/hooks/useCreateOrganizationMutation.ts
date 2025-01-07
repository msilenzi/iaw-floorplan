import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  BasicOrganizationDto,
  CreateOrganizationDto,
} from '@Common/api/generated'
import { useApi } from '@Common/api/useApi'

import { ORGANIZATIONS_QUERY_KEY } from './useOrganizationsQuery'

export function useCreateOrganizationMutation() {
  const { organizationsApi } = useApi()

  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(dto: CreateOrganizationDto) {
      return await organizationsApi.create(dto)
    },
    onSuccess(response) {
      queryClient.setQueryData(
        [ORGANIZATIONS_QUERY_KEY],
        (oldData: BasicOrganizationDto[]) => [
          ...oldData,
          { ...response.data, lastAccessedAt: new Date() },
        ],
      )
    },
  })
}
