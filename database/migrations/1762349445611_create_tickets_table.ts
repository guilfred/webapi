import { PRIORITY, PROVENANCE, STATUS } from '#models/ticket'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tickets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('description').notNullable()
      table
        .enu('provenance', Object.values(PROVENANCE), {
          useNative: true,
          enumName: 'provenance_enum',
          existingType: false,
        })
        .notNullable()
      table
        .enu('status', Object.values(STATUS), {
          useNative: true,
          enumName: 'status_enum',
          existingType: false,
        })
        .notNullable()
      table
        .enu('priority', Object.values(PRIORITY), {
          useNative: true,
          enumName: 'priority_enum',
          existingType: false,
        })
        .notNullable()
      table.integer('project_id').references('id').inTable('projects').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.raw('DROP TYPE IF EXISTS "provenance_enum"')
    this.schema.raw('DROP TYPE IF EXISTS "status_enum"')
    this.schema.raw('DROP TYPE IF EXISTS "priority_enum"')
    this.schema.dropTable(this.tableName)
  }
}
