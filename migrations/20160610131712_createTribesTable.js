
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tribes', function(table){
    table.increments();
    table.string('name').notNullable();
    table.integer('numusers').defaultTo(1);
    table.integer('triberes').defaultTo(0);
    table.integer('tribedis').defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tribes');
};
