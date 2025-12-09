import Profile from '#models/profile'
import User from '#models/user'
import { createUserValidator } from '#validators/user_validators'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { UserDto } from '../../dtos/user_dto.js'

@inject()
export default class UserController {
  constructor(protected presenter: UserDto) {}

  async createAccount({ request, response, auth, bouncer }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }

    if (await bouncer.with('UserPolicy').denies('create')) {
      return response.status(403).json({ message: 'Authorization denied to create a user' })
    }

    const { user: account, profile } = await request.validateUsing(createUserValidator)

    const newAccount = await User.create({ email: account.email, password: account.password })
    const newProfile = await Profile.create({
      name: profile.name,
      firstname: profile.firstname,
      rs: profile.rs || null,
      description: profile.description || null,
      address: profile.address,
      phone: profile.phone,
      website: profile.website || null,
      codePostal: profile.codePostal || null,
      numImmatriculation: profile.numImmatriculation || null,
      profileCategoryID: profile.categoryID,
    })

    await newAccount.related('profile').associate(newProfile)

    return response.status(201).json(newAccount)
  }
}
