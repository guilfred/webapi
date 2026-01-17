import User from '#models/user'
import { PROFILE_TYPE } from '#utils/utils_types'
import { createUserValidator, getUserValidator, showUserValidator } from '#validators/user_validators'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
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
      return response.forbidden({message: 'Authorization denied to create a user'})
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
      return response.forbidden({message: 'Authorization denied to list users'})
    }

    const users =
      user.profile.profileCategory.type === PROFILE_TYPE.SUPER_ADMIN
        ? await User.query()
          .preload('profile', (profileQuery) => {
            profileQuery.preload('profileCategory')
          })
        : await User.query()
            .whereHas('profile', (profileQuery) => {
              profileQuery.whereHas('profileCategory', (categoryQuery) => {
                categoryQuery.where('type', '!=', PROFILE_TYPE.SUPER_ADMIN)
              })
            })
            .preload('profile', (profileQuery) => {
              profileQuery.preload('profileCategory')
            })

    return users.map((user: User) => this.presenter.toJSON(user))
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
      return response.forbidden({message: 'Authorization denied to view user'})
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
      return response.forbidden({message: 'Authorization denied to update account'})
    }
    
    const { params } = await request.validateUsing(getUserValidator)
    const account = await User.findOrFail(params.id)
    account.isEnabled = !account.isEnabled
    await account.save()
    await account.load('profile', (profileQuery) => {
      profileQuery.preload('profileCategory')
    })

    return response.status(200).json(this.presenter.toJSON(account))
  }

  // modification d'un compte
  // modification du mot de passe 
  // mot de passe perdu 
  
}
