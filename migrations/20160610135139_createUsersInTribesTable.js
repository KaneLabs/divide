
exports.up = function(knex, Promise) {
  return knex.schema.createTable('usersintribes', function(table){
    table.increments();
    table.integer('tribeid');
    table.integer('userid');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('usersintribes');
};
