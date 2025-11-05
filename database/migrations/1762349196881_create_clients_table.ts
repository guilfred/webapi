import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('fullName').notNullable()
      table.string('rs').notNullable()
      table.text('description').notNullable()
      table.string('address').nullable()
      table.string('phone').nullable()
      table.string('email').nullable()
      table.string('website').nullable()
      table.string('codePostal').nullable()
      table.string('num_immatriculation').nullable()
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
