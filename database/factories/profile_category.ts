import ProfileCategory from '#models/profile_category'
import { ProfileTitle, ProfileType } from '#utils/utils_types'
import Factory from '@adonisjs/lucid/factories'

export const ProfileCategoryFactory = Factory.define(ProfileCategory, ({ faker }) => {
  return {
    title: ProfileTitle.ADMIN,
    type: ProfileType.ADMIN,
    description: faker.lorem.sentence(),
  }
}).build()
