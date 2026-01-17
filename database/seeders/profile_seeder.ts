import ProfileCategory from '#models/profile_category'
import { PROFILE_TITLE, PROFILE_TYPE } from '#utils/utils_types'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

type PROFILE = {
  title: string
  type: PROFILE_TYPE
  description: string
}

export default class ProfileSeeder extends BaseSeeder {
  async run() {
    await ProfileCategory.createMany([
      {
        title: PROFILE_TITLE.SUPER_ADMIN,
        type: PROFILE_TYPE.SUPER_ADMIN,
        description:
          'Compte super administrateur de la plateforme ayant accès à toutes les fonctionnalités',
      },
      {
        title: PROFILE_TITLE.ADMIN,
        type: PROFILE_TYPE.ADMIN,
        description: 'Compte administrateur de la plateforme',
      },
      {
        title: PROFILE_TITLE.INTERVENANT,
        type: PROFILE_TYPE.INTERVENANT,
        description:
          'Compte intervenant de la plateforme ayant pour rôle de résoudre les tickets des clients',
      },
      {
        title: PROFILE_TITLE.CLIENT,
        type: PROFILE_TYPE.CLIENT,
        description: 'Compte client de la plateforme ayant la possibilité de créer des tickets ',
      },
    ])

  }

  
}
