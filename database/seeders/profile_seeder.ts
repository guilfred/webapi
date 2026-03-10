import ProfileCategory from '#models/profile_category'
import { ProfileTitle, ProfileType } from '#utils/utils_types'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class ProfileSeeder extends BaseSeeder {
  async run() {
    await ProfileCategory.createMany([
      {
        title: ProfileTitle.SUPER_ADMIN,
        type: ProfileType.SUPER_ADMIN,
        description:
          'Compte super administrateur de la plateforme ayant accès à toutes les fonctionnalités',
      },
      {
        title: ProfileTitle.ADMIN,
        type: ProfileType.ADMIN,
        description: 'Compte administrateur de la plateforme',
      },
      {
        title: ProfileTitle.INTERVENANT,
        type: ProfileType.INTERVENANT,
        description:
          'Compte intervenant de la plateforme ayant pour rôle de résoudre les tickets des clients',
      },
      {
        title: ProfileTitle.CLIENT,
        type: ProfileType.CLIENT,
        description: 'Compte client de la plateforme ayant la possibilité de créer des tickets ',
      },
    ])
  }
}
