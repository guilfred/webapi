import Profile from '#models/profile'
import ProfileCategory, { PROFILE_TYPE } from '#models/profile_category'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class UserSeeder extends BaseSeeder {
  async run() {
    // 1. Créer ou récupérer la catégorie de profil
    const superAdminCategory = await ProfileCategory.create({
      type: PROFILE_TYPE.INTERVENANT,
      title: 'Intervenant',
      description: 'Compte intervenant de la plateforme',
    })

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
      profileCategoryID: superAdminCategory.id,
      userID: user.id,
    })

    await user.related('profile').save(profile)
  }
}
