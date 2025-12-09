import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'profile_categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('title').notNullable().unique()
      table.string('type').notNullable()
      table.text('description').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
