import Profile from '#models/profile'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class UserSeeder extends BaseSeeder {
  async run() {
    // 1. Créer ou récupérer la catégorie de profil
    

    // 2. Créer l'utilisateur
    const user = await User.create({
      email: 'shawn@gmail.com',
      password: 'P@ssw0rd',
    })

    const profile = await Profile.create({
      name: 'Shawn',
      firstname: 'Mendez',
      rs: '1234567890',
      description: 'Description',
      address: 'Address',
      phone: '1234567890',
      website: 'https://www.google.com',
      codePostal: '1234567890',
      numImmatriculation: '1234567890',
      profileCategoryID: 1,
      userID: user.id,
    })

    await profile.related('user').associate(user)
  }
}
