import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class ProjectPolicy extends BasePolicy {

  liste(user: User): AuthorizerResponse {
    return user.isAdmin
  }

  create(user: User): AuthorizerResponse {
    return user.isAdmin
  }

  edit(user: User): AuthorizerResponse {
    return user.isAdmin
  }
}
