import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Profile from './profile.js'

export enum PROFILE_TYPE {
  CLIENT = 'client',
  INTERVENANT = 'intervenant',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

type PROFILE_TITLE = 'Client' | 'Intervenant' | 'Administrateur' | 'Super Administrateur'

export default class ProfileCategory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: PROFILE_TITLE

  @column()
  declare type: PROFILE_TYPE

  @column()
  declare description: string

  @hasMany(() => Profile, {
    foreignKey: 'projectID',
  })
  declare profiles: HasMany<typeof Profile>
}
