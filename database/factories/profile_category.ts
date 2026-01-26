import ProfileCategory from '#models/profile_category'
import { PROFILE_TITLE, PROFILE_TYPE } from '#utils/utils_types'
import Factory from '@adonisjs/lucid/factories'

export const ProfileCategoryFactory = Factory.define(ProfileCategory, ({ faker }) => {
  return {
    title: PROFILE_TITLE.ADMIN,
    type: PROFILE_TYPE.ADMIN,
    description: faker.lorem.sentence(),
  }
}).build()
