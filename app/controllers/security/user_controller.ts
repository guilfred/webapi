import User from '#models/user'
import { ProfileType } from '#utils/utils_types'
import {
  createUserValidator,
  getUserValidator,
  showUserValidator,
  updateUserPasswordValidator,
  updateUserProfileValidator,
} from '#validators/user_validators'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import { UserDto } from '../../dtos/user_dto.js'

@inject()
export default class UserController {
  constructor(protected presenter: UserDto) {}

  // Création de compte
  async createAccount({ request, response, auth, bouncer }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    await user.load('profile', (profileQuery) => {
      profileQuery.preload('profileCategory')
    })

    // Peut créer un compte que si on est Admin ou Super Admin
    if (await bouncer.with('UserPolicy').denies('create')) {
      return response.forbidden({ message: 'Authorization denied to create a user' })
    }

    const { user: account, profile } = await request.validateUsing(createUserValidator)

    const newAccount = await User.create({ email: account.email, password: account.password })

    await newAccount.related('profile').create({
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

    await newAccount.load('profile', (profileQuery) => {
      profileQuery.preload('profileCategory')
    })

    return response.status(201).json(this.presenter.toJSON(newAccount))
  }

  // Liste des comptes users
  async listeAccount({ response, auth, bouncer }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    await user.load('profile', (profileQuery) => {
      profileQuery.preload('profileCategory')
    })

    // Peut créer un compte que si on est Admin ou Super Admin
    if (await bouncer.with('UserPolicy').denies('liste')) {
      return response.forbidden({ message: 'Authorization denied to list users' })
    }

    const users =
      user.profile.profileCategory.type === ProfileType.SUPER_ADMIN
        ? await User.query().preload('profile', (profileQuery) => {
            profileQuery.preload('profileCategory')
          })
        : await User.query()
            .whereHas('profile', (profileQuery) => {
              profileQuery.whereHas('profileCategory', (categoryQuery) => {
                categoryQuery.where('type', '!=', ProfileType.SUPER_ADMIN)
              })
            })
            .preload('profile', (profileQuery) => {
              profileQuery.preload('profileCategory')
            })

    return users.map((account: User) => this.presenter.toJSON(account))
  }

  // Récupérer un compte user
  async getAccount({ request, response, auth, bouncer }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    await user.load('profile', (profileQuery) => {
      profileQuery.preload('profileCategory')
    })

    // Peut créer un compte que si on est Admin ou Super Admin
    if (await bouncer.with('UserPolicy').denies('show')) {
      return response.forbidden({ message: 'Authorization denied to view user' })
    }

    const { params } = await request.validateUsing(showUserValidator)

    const account = await User.findOrFail(params.id)
    await account.load('profile', (profileQuery) => {
      profileQuery.preload('profileCategory')
    })

    return response.status(200).json(this.presenter.toJSON(account))
  }

  async updateAbleAccount({ request, response, auth, bouncer }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    await user.load('profile', (profileQuery) => {
      profileQuery.preload('profileCategory')
    })

    if (await bouncer.with('UserPolicy').denies('updateAccount')) {
      return response.forbidden({ message: 'Authorization denied to update account' })
    }

    const { params } = await request.validateUsing(getUserValidator)
    const account = await User.findOrFail(params.id)
    account.isEnabled = !account.isEnabled
    await account.save()
    await account.load('profile', (profileQuery) => {
      return profileQuery.preload('profileCategory')
    })

    return response.status(200).json(this.presenter.toJSON(account))
  }

  // Modification du mot du compte connecté
  async updatePassword({ request, response, auth }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { password, newPassword } = await request.validateUsing(updateUserPasswordValidator)
    if (!hash.verify(user.password, password)) {
      return response.badRequest({ message: "Le mot de passe actuelle n'est pas valide !" })
    }
    await user.merge({ password: newPassword }).save()

    return response.status(200).json({ message: 'Mot de passe mis à jour avec succès !' })
  }

  // Modification des informations du profile
  async updateProfile({ request, response, auth }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const {
      name,
      firstname,
      rs,
      numImmatriculation,
      phone,
      website,
      description,
      address,
      codePostal,
    } = await request.validateUsing(updateUserProfileValidator)
    await user.load('profile', (profileQuery) => {
      profileQuery.preload('profileCategory')
    })
    await user.profile
      .merge({
        name,
        firstname,
        rs,
        numImmatriculation,
        phone,
        website,
        description,
        address,
        codePostal,
      })
      .save()

    return response.status(200).json(this.presenter.toJSON(user))
  }
}
