import ProfileCategory from '#models/profile_category'
import Project from '#models/project'
import User from '#models/user'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare firstname: string

  @column()
  declare rs: string | null

  @column()
  declare description: string | null

  @column()
  declare address: string

  @column()
  declare phone: string

  @column()
  declare website: string | null

  @column()
  declare codePostal: string | null

  @column()
  declare numImmatriculation: string | null

  @column({ columnName: 'user_id' })
  declare userID: number

  @column({ columnName: 'profile_category_id' })
  declare profileCategoryID: number

  @belongsTo(() => ProfileCategory, {
    foreignKey: 'profileCategoryID',
    localKey: 'id',
  })
  declare profileCategory: BelongsTo<typeof ProfileCategory>

  @hasMany(() => Project, {
    foreignKey: 'ProfileID',
  })
  declare projects: HasMany<typeof Project>

  // ✅ Profile BELONGS TO User (Profile possède user_id)
  @belongsTo(() => User, {
    foreignKey: 'userID', // Cette clé existe sur Profile (user_id)
  })
  declare user: BelongsTo<typeof User>

  getFullName() {
    return `${this.name} ${this.firstname}`
  }
}
