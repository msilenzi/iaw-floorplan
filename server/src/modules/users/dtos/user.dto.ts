import { User } from '../types/user.type'

export class UserDto implements User {
  user_id: string
  email: string
  name: string
  picture: string
}
