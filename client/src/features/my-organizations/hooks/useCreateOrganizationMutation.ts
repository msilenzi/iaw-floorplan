import type { BasicOrganizationDto, CreateOrganizationDto } from '@Common/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'

import { getOrganizationsQueryKey } from './useOrganizationsQuery'

export function useCreateOrganizationMutation() {
  const { organizationsApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(dto: CreateOrganizationDto) {
      return await organizationsApi.create(dto)
    },
    onSuccess(response) {
      queryClient.setQueryData(
        getOrganizationsQueryKey(),
        (oldData: BasicOrganizationDto[]) => [
          ...oldData,
          { ...response.data, lastAccessedAt: new Date() },
        ],
      )
    },
  })
}
