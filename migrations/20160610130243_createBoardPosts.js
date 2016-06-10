exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('name').unique().notNullable();
    table.string('password').notNullable();
    table.string('email').unique().notNullable();
    table.integer('profileimgid').defaultTo(1);
    table.integer('tribeid');
    table.integer('respect').defaultTo(0);
    table.integer('disrespect').defaultTo(0);
    table.string('oauthtoken').unique();
    table.boolean('isgod').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
