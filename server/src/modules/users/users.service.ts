import { Injectable } from '@nestjs/common'

import cfg from 'src/cfg'
import { User } from './types/user.type'

@Injectable()
export class UsersService {
  async fetchUsers(usersIds: string[]): Promise<User[]> {
    try {
      const url = new URL(`${cfg.AUTH0_ISSUER_URL}api/v2/users`)
      url.search = new URLSearchParams({
        q: `user_id:(${usersIds.join(' OR ')})`,
        fields: 'user_id,name,email,picture',
        search_engine: 'v3',
      }).toString()

      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cfg.AUTH0_MANAGEMENT_TOKEN}`,
          'Content-Type': 'application/json',
        },
      })

      if (!resp.ok) {
        throw new Error(`Bad response: ${resp.status} - ${resp.statusText}`)
      }

      const users: User[] = await resp.json()
      return users
    } catch (error) {
      throw new Error(`Error fetching users from Auth0: ${error.message}`)
    }
  }
}
