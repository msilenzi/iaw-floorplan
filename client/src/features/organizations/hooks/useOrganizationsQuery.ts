import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  BasicOrganizationDto,
  CreateOrganizationDto,
} from '@Common/api/generated'
import useApi from '@Common/api/useApi'

const ORGANIZATIONS_QUERY_KEY = 'organizations'

export default function useOrganizationsQuery() {
  const { organizationsApi, apisAvailable } = useApi()

  const query = useQuery({
    queryKey: [ORGANIZATIONS_QUERY_KEY],
    queryFn: async () => (await organizationsApi.findAll()).data,
    enabled: apisAvailable,
    staleTime: 300_000, //  5 min
    gcTime: 600_000, // 10 min
  })

  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationKey: [ORGANIZATIONS_QUERY_KEY],
    mutationFn: async (dto: CreateOrganizationDto) =>
      await organizationsApi.create(dto),
    onSuccess: (response) => {
      queryClient.setQueryData(
        [ORGANIZATIONS_QUERY_KEY],
        (oldData: BasicOrganizationDto[]) => [...oldData, response.data],
      )
    },
  })

  return { query, createMutation }
}
