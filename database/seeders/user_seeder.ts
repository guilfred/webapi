import Profile from '#models/profile'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

type USER = {
  email: string
  password: string
}

type PROFILE = {
  name: string
  firstname: string
  rs: string
  description: string
  address: string
  phone: string
  website: string
  codePostal: string
  numImmatriculation: string
}

type INFO_USER = {
  user: USER,
  profile: PROFILE
}
export default class UserSeeder extends BaseSeeder {
  async run() {

    const dataInfos: INFO_USER[] = [
      {
        user: {
          email: 'shawn@gmail.com',
          password: 'P@ssw0rd',
        },
        profile: {
          name: 'Shawn',
          firstname: 'Mendez',
          rs: '1234567890',
          description: 'Description',
          address: 'Address',
          phone: '1234567890',
          website: 'https://www.google.com',
          codePostal: '1234567890',
          numImmatriculation: '1234567890',
          //profileCategoryID: 1,
          //userID: user.id,
        }
      },
      {
        user: {
          email: 'sheperd@mail.test',
          password: 'P@ssw0rd',
        },
        profile: {
          name: 'Sheperd',
          firstname: 'Cloe',
          rs: '1234567890',
          description: 'Description',
          address: 'Address',
          phone: '1234567890',
          website: 'https://www.facebook.com',
          codePostal: '1010',
          numImmatriculation: '123456722',
          //profileCategoryID: 1,
          //userID: user.id,
        }
      },
      {
        user: {
          email: 'joe@mail.test',
          password: 'P@ssw0rd',
        },
        profile: {
          name: 'Joe',
          firstname: 'Delgados',
          rs: '1234567890',
          description: 'Description',
          address: 'Address',
          phone: '1234567890',
          website: 'https://www.inc.com',
          codePostal: '1234567890',
          numImmatriculation: '1234567890',
          //profileCategoryID: 1,
          //userID: user.id,
        }
      },
      {
        user: {
          email: 'marc@mail.test',
          password: 'P@ssw0rd',
        },
        profile: {
          name: 'Marc',
          firstname: 'Zuck',
          rs: '1234567890',
          description: 'Description',
          address: 'Address',
          phone: '1234567890',
          website: 'https://www.google.com',
          codePostal: '1234567890',
          numImmatriculation: '1234567890',
          //profileCategoryID: 1,
          //userID: user.id,
        }
      }
    ]

    await db.transaction(async (trx) => {
      for (const [index, v] of dataInfos.entries()) {
        const user = await User.create(
          {
            email: v.user.email,
            password: v.user.password,
          },
          { client: trx }
        )
    
        await Profile.create(
          {
            ...v.profile,
            profileCategoryID: index + 1,
            userID: user.id,
          },
          { client: trx }
        )
      }
    })
    
      
  }
}
