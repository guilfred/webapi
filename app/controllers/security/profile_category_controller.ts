import ProfileCategory from '#models/profile_category'
import { PROFILE_TYPE } from '#utils/utils_types'
import { getProfileValidator } from '#validators/profile_validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { ProfileCategoryDto } from '../../dtos/profile_category_dto.js'

@inject()
export default class ProfileCategoryController {
  constructor(protected presenter: ProfileCategoryDto) {}

  async listOfProfiles({ auth, bouncer, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }

    if (await bouncer.with('ProfileCategoryPolicy').denies('create', PROFILE_TYPE.ADMIN)) {
      return response.forbidden()
    }

    const profiles = await ProfileCategory.all()
    const responseData = profiles.map((profile: ProfileCategory) => this.presenter.toJSON(profile))

    return response.status(200).json(responseData)
  }

  async getProfileCategory({ auth, bouncer, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }

    if (await bouncer.with('ProfileCategoryPolicy').denies('create', PROFILE_TYPE.ADMIN)) {
      return response.forbidden()
    }

    const { params } = await request.validateUsing(getProfileValidator)
    const category = await ProfileCategory.findOrFail(params.id)

    return response.status(200).json(this.presenter.toJSON(category))
  }
}
