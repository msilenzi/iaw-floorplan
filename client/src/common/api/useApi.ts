import { useEffect } from 'react'

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { useAuth0 } from '@auth0/auth0-react'

import {
  Configuration,
  OrganizationMembersApi,
  OrganizationsApi,
} from './generated'

type ApisInstances = {
  organizationsApi: OrganizationsApi
  organizationMembersApi: OrganizationMembersApi
}

type ApiStore = {
  // State
  apis: ApisInstances | null
  apisAvailable: boolean

  // Actions
  initialize: (token: string) => void
}

const useApiStore = create<ApiStore>()(
  devtools((set) => ({
    // Initial state:
    apis: null,
    apisAvailable: false,

    initialize(token) {
      const configuration = new Configuration({
        basePath: import.meta.env.VITE_API_BASE_URL,
        accessToken: token,
      })
      const apis: ApisInstances = {
        organizationsApi: new OrganizationsApi(configuration),
        organizationMembersApi: new OrganizationMembersApi(configuration),
      }
      set({ apis, apisAvailable: true }, undefined, 'apiStore/initialize')
    },
  })),
)

export default function useApi() {
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0()
  const { apis, apisAvailable, initialize } = useApiStore()

  useEffect(() => {
    async function initializeApi() {
      const token = await getAccessTokenSilently()
      initialize(token)
    }

    if (!apisAvailable && !isLoading && isAuthenticated) {
      void initializeApi()
    }
  }, [
    apisAvailable,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    initialize,
  ])

  return { ...(apis as ApisInstances), apisAvailable }
}
