
exports.up = function(knex, Promise) {
  return knex.schema.createTable('publish', (table) => {
    table.increments();
    table.bigInteger('book_id').notNullable().references('id').inTable('books').onDelete('cascade');
    table.bigInteger('author_id').notNullable().references('id').inTable('authors').onDelete('cascade')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('publish')
};
