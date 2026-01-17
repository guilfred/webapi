import { PROFILE_TYPE } from '#utils/utils_types'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
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
  // ce fournisseur permet de créer, lister et vérifier les jetons d'accès
  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '1 day',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })
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

  get isAdmin(): boolean {
    return [PROFILE_TYPE.SUPER_ADMIN, PROFILE_TYPE.ADMIN]
      .includes(this.profile.profileCategory.type)
  }

  get isSuperAdmin(): boolean {
    return this.profile?.profileCategory?.type === PROFILE_TYPE.SUPER_ADMIN
  }
}
