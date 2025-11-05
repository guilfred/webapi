import User, { ROLE } from '#models/user'
import { createUserValidator } from '#validators/user_validators'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { UserDto } from '../../dtos/user_dto.js'

@inject()
export default class UserController {
  constructor(protected presenter: UserDto) {}

  async listUsers({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const users = await User.query()
      .where('role', '!=', ROLE.SUPER_ADMIN)
      .orderBy('created_at', 'desc')

    return response.status(200).json(users.map((u: User) => this.presenter.toJSON(u)))
  }

  async createUser({ auth, response, request }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { email, password } = await request.validateUsing(createUserValidator)
    const account = await User.create({ email, password })

    return response.status(201).json(this.presenter.toJSON(account))
  }
}
