import Profile from '#models/profile'
import Factory from '@adonisjs/lucid/factories'
import { ProfileCategoryFactory } from './profile_category.js'
import { UserFactory } from './user.js'

export const ProfileFactory = Factory.define(Profile, ({ faker }) => {
  return {
    name: faker.person.lastName('male'),
    firstname: faker.person.firstName('male'),
    address: faker.lorem.text(),
    phone: faker.phone.number()
  }
})
.relation('user', () => UserFactory)
.relation('profileCategory', () => ProfileCategoryFactory)
.build()
