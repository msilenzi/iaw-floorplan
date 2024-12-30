import { useQuery } from '@tanstack/react-query'

import useApi from '@Common/api/useApi'

export default function useOrganizationsQuery() {
  const { organizationsApi, apisAvailable } = useApi()

  const query = useQuery({
    enabled: () => apisAvailable,
    queryKey: ['organization'],
    queryFn: async () => {
      const resp = await organizationsApi.findAll()
      return resp.data
    },
  })

  return { ...query }
}
