/**
 * Agregar algunos tipados adicionales para Express
 */

import { Member } from 'src/modules/organizations/schemas/member.schema'
import { OrganizationDocument } from 'src/modules/organizations/schemas/organization.schema'
import { ProjectDocument } from 'src/modules/projects/schemas/project.schema'

export {}

declare global {
  namespace Express {
    interface User {
      sub: string

      iss: string
      aud: string
      iat: number
      exp: number
      scope: string
      azp: string
    }

    interface Request {
      organization?: OrganizationDocument
      member?: Member
      project?: ProjectDocument
    }
  }
}
