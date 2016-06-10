
exports.up = function(knex, Promise) {
  return knex.schema.createTable('keywordsonposts', function(table){
    table.increments();
    table.integer('postid')
    table.integer('keywordid')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('keywordsonposts');
};
