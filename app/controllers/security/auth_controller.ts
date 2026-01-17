import User from '#models/user'
import { AuthenticationValidator } from '#validators/auth_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { UserDto } from '../../dtos/user_dto.js'

@inject()
export default class AuthController {
  constructor(protected presenter: UserDto) {}

  async authentication({ auth, request, response }: HttpContext) {
    const { username, password } = await request.validateUsing(AuthenticationValidator)

    const user = await User.verifyCredentials(username, password)
    if (!user.isEnabled) {
      return response.status(401).json({message: "Authentication failed! Your account is disabled."})
    }
    await auth.use('web').login(user)

    user.lastLoginAt = DateTime.now()
    await user.save()
    await user.load('profile', (profileQuery) => {
      profileQuery.preload('profileCategory')
    })

    return response.json(this.presenter.toJSON(user))
  }

  async currentUser({ response, auth }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    await user.load('profile', (profileQuery) => {
      profileQuery.preload('profileCategory')
    })
    return response.status(200).json(this.presenter.toJSON(user))
  }
}
