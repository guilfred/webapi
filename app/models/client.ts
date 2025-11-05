import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Project from './project.js'
import User from './user.js'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string

  @column()
  declare rs: string

  @column()
  declare description: string

  @column()
  declare address: string | null

  @column()
  declare phone: string | null

  @column()
  declare email: string | null

  @column()
  declare website: string | null

  @column()
  declare codePostal: string | null

  @column()
  declare numImmatriculation: string | null

  @hasMany(() => Project, {
    foreignKey: 'clientID',
  })
  declare projects: HasMany<typeof Project>

  @column({ columnName: 'user_id' })
  declare userID: number

  @hasOne(() => User, {
    foreignKey: 'userID',
  })
  declare user: HasOne<typeof User>
}
