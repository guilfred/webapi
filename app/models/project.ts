import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Profile from './profile.js'
import Ticket from './ticket.js'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @hasMany(() => Ticket, {
    foreignKey: 'projectID',
  })
  declare tickets: HasMany<typeof Ticket>

  @column({ columnName: 'profile_id' })
  declare profileID: number

  @belongsTo(() => Profile, {
    foreignKey: 'profileID',
    localKey: 'id',
  })
  declare profile: BelongsTo<typeof Profile>
}
