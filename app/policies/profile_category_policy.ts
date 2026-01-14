import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

type PROFILE_CATEGORY = 'super_admin' | 'admin'

export default class ProfileCategoryPolicy extends BasePolicy {
  create(user: User, category: PROFILE_CATEGORY): AuthorizerResponse {
    return user.profile.profileCategory.type === category
  }
}
