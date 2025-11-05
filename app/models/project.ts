import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Client from './client.js'
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

  @column({ columnName: 'client_id' })
  declare clientID: number

  @belongsTo(() => Client, {
    foreignKey: 'clientID',
    localKey: 'id',
  })
  declare client: BelongsTo<typeof Client>
}
