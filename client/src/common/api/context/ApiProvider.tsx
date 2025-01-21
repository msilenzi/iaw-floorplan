import { useCallback, useEffect, useState } from 'react'

import type { ApiContextType } from '../types'

import { useAuth0 } from '@auth0/auth0-react'

import {
  Configuration,
  OrganizationMembersApi,
  OrganizationsApi,
  ProjectsApi,
} from '../generated'
import { ApiContext } from './ApiContext'

type ApiProviderProps = {
  children: React.ReactNode
}

export function ApiProvider({ children }: ApiProviderProps) {
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0()

  const [apis, setApis] = useState<ApiContextType['apis']>(null)
  const [apisAvailable, setApisAvailable] =
    useState<ApiContextType['apisAvailable']>(false)

  const initialize = useCallback((token: string) => {
    const configuration = new Configuration({
      basePath: import.meta.env.VITE_API_BASE_URL,
      accessToken: token,
    })
    setApis({
      organizationsApi: new OrganizationsApi(configuration),
      organizationMembersApi: new OrganizationMembersApi(configuration),
      projectsApi: new ProjectsApi(configuration),
    })
    setApisAvailable(true)
  }, [])

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

  return (
    <ApiContext.Provider value={{ apis, apisAvailable }}>
      {children}
    </ApiContext.Provider>
  )
}
