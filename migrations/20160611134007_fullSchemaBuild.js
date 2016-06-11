exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments().primary();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.string('email').unique().notNullable();
      table.integer('profileimgid').defaultTo(1);
      table.integer('tribeid').references('id').inTable('tribes');
      table.integer('respect').defaultTo(0);
      table.integer('disrespect').defaultTo(0);
      table.string('oauthtoken').unique();
      table.boolean('isgod').defaultTo(false);
    }),
    knex.schema.createTable('tribes', function(table){
      table.increments().primary();
      table.string('name').notNullable();
      table.integer('numusers').defaultTo(1);
      table.integer('triberes').defaultTo(0);
      table.integer('tribedis').defaultTo(0);
    }),
    knex.schema.createTable('keywords', function(table){
      table.increments().primary();
      table.string('keyword');
    }),
    knex.schema.createTable('boardposts', function(table){
      table.increments().primary();
      table.integer('userid');
      table.string('title').notNullable();
      table.text('body').notNullable();
      table.timestamp('created').defaultTo(knex.fn.now());
      table.integer('respect').notNullable().defaultTo(0);
      table.integer('disrespect').notNullable().defaultTo(0);
      table.decimal('lat', 15, 3);
      table.decimal('lng', 15, 3);
      table.string('city');
      table.string('state');
    }),
    knex.schema.createTable('users_in_tribes', function(table){
      table.increments().primary();
      table.integer('tribeid').references('id').inTable('tribes');
      table.integer('userid').references('id').inTable('users');
    }),
    knex.schema.createTable('keywords_on_posts', function(table){
      table.increments().primary();
      table.integer('postid').references('id').inTable('boardposts');
      table.integer('keywordid').references('id').inTable('keywords');
    }),
    knex.schema.createTable('board_post_comments', function(table){
      table.increments().primary();
      table.integer('postid').references('id').inTable('boardposts');
      table.integer('userid').references('id').inTable('users');
      table.text('body');
    }),
    knex.schema.createTable('images', function(table) {
      table.increments().primary();
      table.string('originalname');
    }),
    knex.schema.createTable('images_on_post', function(table) {
      table.increments().primary();
      table.integer('boardpostid').references('id').inTable('boardposts');
      table.integer('imageid').references('id').inTable('images');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('drop table if exists users cascade'),
    knex.raw('drop table if exists tribes cascade'),
    knex.raw('drop table if exists images cascade'),
    knex.raw('drop table if exists keywords cascade'),
    knex.raw('drop table if exists boardposts cascade'),
    knex.raw('drop table if exists images_on_post cascade'),
    knex.raw('drop table if exists users_in_tribes cascade'),
    knex.raw('drop table if exists keywords_on_posts cascade'),
    knex.raw('drop table if exists board_post_comments cascade')
  ])
};
