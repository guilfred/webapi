import { PROFILE_TYPE } from '#models/profile_category'
import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class UserPolicy extends BasePolicy {
  private readonly adminRoles = new Set([PROFILE_TYPE.SUPER_ADMIN, PROFILE_TYPE.ADMIN])

  create(user: User): AuthorizerResponse {
    return this.adminRoles.has(user.profile.profileCategory.type)
  }
}
