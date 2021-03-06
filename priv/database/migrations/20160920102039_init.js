'use strict'

exports.up = (knex, Promise) => knex.schema
  .createTable('user', (table) => {
    table.increments().primary()
    table.string('email').notNullable().unique()
    table.string('name')
    table.string('password')
    table.string('password_reset')
    table.timestamp('last_login_at')
    table.timestamps()
  })
  .createTable('camp', (table) => {
    table.increments().primary()
    table.string('name').notNullable()
    table.string('description')
    table.timestamps()
  })
  .createTable('handle', (table) => {
    table.increments().primary()
    table.bigInteger('uid').notNullable().unique()
    table.string('username').notNullable().unique()
    table.string('name').notNullable()
    table.jsonb('profile').defaultTo('{}')
    table.integer('camp_id').references('camp.id')
      .onUpdate('cascade').onDelete('set null')
    table.timestamps()
  })
  .createTable('topic', (table) => {
    table.increments().primary()
    table.string('name').notNullable()
    table.string('description')
    table.jsonb('keywords').defaultTo('[]')
    table.timestamps()
  })
  .createTable('handle_topic', (table) => {
    table.increments().primary()
    table.integer('handle_id').notNullable().references('handle.id')
      .onUpdate('cascade').onDelete('cascade')
    table.integer('topic_id').notNullable().references('topic.id')
      .onUpdate('cascade').onDelete('cascade')
    table.unique(['handle_id', 'topic_id'])
    table.timestamps()
  })

exports.down = (knex, Promise) => knex.schema
  .dropTable('handle_topic')
  .dropTable('topic')
  .dropTable('handle')
  .dropTable('camp')
  .dropTable('user')
