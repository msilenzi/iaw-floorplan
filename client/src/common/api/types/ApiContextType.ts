import type {
  OrganizationMembersApi,
  OrganizationsApi,
  ProjectResourcesApi,
  ProjectsApi,
} from '../generated'

export type ApisInstances = {
  organizationsApi: OrganizationsApi
  organizationMembersApi: OrganizationMembersApi
  projectsApi: ProjectsApi
  projectsResourcesApi: ProjectResourcesApi
}

export type ApiContextType = {
  apis: ApisInstances | null
  apisAvailable: boolean
}
