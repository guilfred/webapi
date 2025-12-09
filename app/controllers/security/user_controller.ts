import { inject } from '@adonisjs/core'
import { UserDto } from '../../dtos/user_dto.js'

@inject()
export default class UserController {
  constructor(protected presenter: UserDto) {}
}
