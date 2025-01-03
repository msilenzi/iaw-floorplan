/**
 * Agregar algunos tipados adicionales para Express
 */

import { OrganizationDocument } from 'src/modules/organizations/schemas/organization.schema'

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
    }
  }
}
