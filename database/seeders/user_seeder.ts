import User, { ROLE } from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class UserSeeder extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        email: 'guilfred.assezo@gmail.com',
        password: 'P@ssw0rd',
        role: ROLE.SUPER_ADMIN,
      },
      {
        email: 'dev@mail.test',
        password: 'P@ssw0rd',
        role: ROLE.ADMIN,
      },
    ])
  }
}
