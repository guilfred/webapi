import ProfileCategory from '#models/profile_category'
import { getProfileValidator } from '#validators/profile_validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { ProfileCategoryDto } from '../../dtos/profile_category_dto.js'

@inject()
export default class ProfileCategoryController {
  constructor(protected presenter: ProfileCategoryDto) {}

  // Récupère la liste des catégories de profile
  async listOfProfiles({ auth, bouncer, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    await user.load('profile', (profileQuery) => {
      profileQuery.preload('profileCategory')
    })

    if (await bouncer.with('ProfileCategoryPolicy').denies('create')) {
      return response.forbidden()
    }

    const categoryProfiles = await ProfileCategory.all()
    const responseData = categoryProfiles.map((cat: ProfileCategory) => this.presenter.toJSON(cat))

    return response.status(200).json(responseData)
  }

  // Récupère la une catégorie de profile
  async getProfileCategory({ auth, bouncer, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    await user.load('profile', (profileQuery) => {
      profileQuery.preload('profileCategory')
    })

    if (await bouncer.with('ProfileCategoryPolicy').denies('show')) {
      return response.forbidden()
    }

    const { params } = await request.validateUsing(getProfileValidator)
    const category = await ProfileCategory.findOrFail(params.id)

    return response.status(200).json(this.presenter.toJSON(category))
  }
}
