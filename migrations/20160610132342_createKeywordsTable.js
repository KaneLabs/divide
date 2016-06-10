
exports.up = function(knex, Promise) {
  return knex.schema.createTable('keywords', function(table){
    table.increments();
    table.string('keyword');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('keywords');
};
