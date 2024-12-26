/**
 * Tipar el payload del JWT en req.user
 */

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
  }
}
