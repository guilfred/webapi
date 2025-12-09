import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('firstname').notNullable()
      table.string('rs').nullable()
      table.text('description').nullable()
      table.string('address').notNullable()
      table.string('phone').notNullable()
      table.string('website').notNullable()
      table.string('codePostal').notNullable()
      table.string('num_immatriculation').nullable()
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('profile_category_id')
        .references('id')
        .inTable('profile_categories')
        .onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
