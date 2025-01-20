import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  type BasicOrganizationDto,
  type CreateOrganizationDto,
  useApi,
} from '@Common/api'

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
