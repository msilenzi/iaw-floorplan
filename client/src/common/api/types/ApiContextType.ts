import type {
  OrganizationMembersApi,
  OrganizationsApi,
  ProjectsApi,
  ResourcesApi,
} from '../generated'

export type ApisInstances = {
  organizationsApi: OrganizationsApi
  membersApi: OrganizationMembersApi
  projectsApi: ProjectsApi
  resourcesApi: ResourcesApi
}

export type ApiContextType = {
  apis: ApisInstances | null
  apisAvailable: boolean
}
