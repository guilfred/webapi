import { ProfileTitle, ProfileType } from '#utils/utils_types'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Profile from './profile.js'

export default class ProfileCategory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: ProfileTitle

  @column()
  declare type: ProfileType

  @column()
  declare description: string

  @hasMany(() => Profile, {
    foreignKey: 'projectID',
  })
  declare profiles: HasMany<typeof Profile>
}
