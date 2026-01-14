import { PROFILE_TITLE, PROFILE_TYPE } from '#utils/utils_types'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Profile from './profile.js'

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
