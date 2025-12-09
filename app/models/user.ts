import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Profile from './profile.js'

const AuthFinder = withAuthFinder(() => hash.use('argon'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column({ columnName: 'is_enabled' })
  declare isEnabled: boolean

  @column({ columnName: 'last_login_at' })
  declare lastLoginAt: DateTime | null // date de la dernière connexion

  @hasOne(() => Profile, {
    foreignKey: 'userID', // Cette clé existe sur Profile
  })
  declare profile: HasOne<typeof Profile>

  constructor() {
    super()
    this.isEnabled = true // active le compte par défaut
  }
}
