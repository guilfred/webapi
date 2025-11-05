import { ROLE } from '#models/user'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.boolean('is_enabled').notNullable()
      table.timestamp('lastLoginAt').nullable()
      table
        .enu('role', Object.values(ROLE), {
          useNative: true,
          enumName: 'user_role',
          existingType: false,
        })
        .notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.raw('DROP TYPE IF EXISTS "user_role"')
    this.schema.dropTable(this.tableName)
  }
}
