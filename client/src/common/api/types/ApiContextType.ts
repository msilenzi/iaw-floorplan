import {
  OrganizationMembersApi,
  OrganizationsApi,
  ProjectsApi,
} from '../generated'

export type ApisInstances = {
  organizationsApi: OrganizationsApi
  organizationMembersApi: OrganizationMembersApi
  projectsApi: ProjectsApi
}

export type ApiContextType = {
  apis: ApisInstances | null
  apisAvailable: boolean
}
