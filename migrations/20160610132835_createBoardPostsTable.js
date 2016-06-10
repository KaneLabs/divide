
exports.up = function(knex, Promise) {
  return knex.schema.createTable('boardposts', function(table){
    table.increments();
    table.integer('userid');
    table.integer('keyword_on_postid');
    table.string('title').notNullable();
    table.text('body').notNullable();
    table.timestamp('created').defaultTo(knex.fn.now());
    table.integer('respect').notNullable().defaultTo(0);
    table.integer('disrespect').notNullable().defaultTo(0);
    table.decimal('lat', 15, 3);
    table.decimal('lng', 15, 3);
    table.string('city');
    table.string('state');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('boardposts')
};
