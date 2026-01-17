import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class UserPolicy extends BasePolicy {

  create(user: User): AuthorizerResponse {
    return user.isAdmin
  }

  liste(user: User): AuthorizerResponse {
    return user.isAdmin
  }

  show(user: User): AuthorizerResponse {
    return user.isAdmin
  }

  updateAccount(user: User): AuthorizerResponse {
    return user.isSuperAdmin
  }
}
