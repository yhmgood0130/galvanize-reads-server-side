
exports.up = function(knex, Promise) {

  return knex.schema.createTable('books', (table) => {
    table.increments();
    table.string("title");
    table.string("genre");
    table.string("description", 1000);
    table.string("url");
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('books');
};
