import type {
  CropsApi,
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
  cropsApi: CropsApi
}

export type ApiContextType = {
  apis: ApisInstances | null
  apisAvailable: boolean
}
