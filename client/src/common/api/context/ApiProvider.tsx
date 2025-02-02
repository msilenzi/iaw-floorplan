import type { ApiContextType } from '../types'

import { useCallback, useEffect, useState } from 'react'

import { useAuth0 } from '@auth0/auth0-react'

import {
  Configuration,
  CropsApi,
  OrganizationMembersApi,
  OrganizationsApi,
  ProjectsApi,
  ResourcesApi,
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

  const createApisInstances = useCallback(async () => {
    setApisAvailable(false)
    const token = await getAccessTokenSilently()
    const configuration = new Configuration({
      basePath: import.meta.env.VITE_API_BASE_URL,
      accessToken: token,
    })
    setApis({
      organizationsApi: new OrganizationsApi(configuration),
      membersApi: new OrganizationMembersApi(configuration),
      projectsApi: new ProjectsApi(configuration),
      resourcesApi: new ResourcesApi(configuration),
      cropsApi: new CropsApi(configuration),
    })
    setApisAvailable(true)
  }, [getAccessTokenSilently])

  useEffect(() => {
    if (!apisAvailable && !isLoading && isAuthenticated) {
      void createApisInstances()
    }
  }, [apisAvailable, createApisInstances, isAuthenticated, isLoading])

  return (
    <ApiContext.Provider value={{ apis, apisAvailable }}>
      {children}
    </ApiContext.Provider>
  )
}
