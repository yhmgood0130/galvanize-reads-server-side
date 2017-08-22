const knex = require ('./knex')

module.exports = {
  getAllBooks: function() {
    return knex('books').select();
  },
  getAllAuthors: function() {
    return knex('authors').select();
  }
}
