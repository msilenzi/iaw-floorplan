/**
 * Agregar algunos tipados adicionales para Express
 */

import { CropDocument } from 'src/modules/crops/schemas/crop.schema'
import { Member } from 'src/modules/organizations/schemas/member.schema'
import { OrganizationDocument } from 'src/modules/organizations/schemas/organization.schema'
import { ProjectDocument } from 'src/modules/projects/schemas/project.schema'
import { ResourceDocument } from 'src/modules/resources/schemas/resource.schema'

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
      resource?: ResourceDocument
      crop?: CropDocument
    }
  }
}
