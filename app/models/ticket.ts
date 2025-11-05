import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Project from './project.js'

export enum PROVENANCE {
  SITE = 'site',
  EMAIl = 'email',
  PHONE = 'phone',
  DIRECT = 'direct',
}

export enum STATUS {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REJECTED = 'rejected',
}

export enum PRIORITY {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export default class Ticket extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare provenance: PROVENANCE

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column()
  declare priority: PRIORITY

  @column()
  declare status: STATUS

  @column({ columnName: 'project_id' })
  declare projectID: number

  @belongsTo(() => Project, {
    foreignKey: 'projectID',
    localKey: 'id',
  })
  declare project: BelongsTo<typeof Project>
}
