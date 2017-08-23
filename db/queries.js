const knex = require ('./knex')

module.exports = {
  getAllBooks: function() {
    return knex('books').select();
  },
  getAllAuthors: function() {
    return knex('authors').select();
  },
  getBooksByAuthor: author_id => {
    return knex('books').select("books.*")
      .innerJoin("publish","books.id","publish.book_id")
      .innerJoin("authors","publish.author_id","authors.id")
      .where("authors.id",author_id)
  },
  getAuthorsByBook: book_id => {
    return knex('authors').select("authors.*")
      .innerJoin("publish","authors.id","publish.author_id")
      .innerJoin("books","publish.book_id","books.id")
      .where("books.id",book_id)
  },
  addBook: book => {
    return knex('books').insert(book,'*').returning('*');
  },
  addAuthor: author => {
    return knex('authors').insert(author,'*').returning('*');
  },
  editBook: (edit,id) => {
    return knex('books').where('id',id).update(edit).returning('*');
  },
  editAuthor: (edit,id) => {
    return knex('authors').where('id',id).update(edit).returning('*');
  },
  deleteBook: id => {
    return knex('books').where('id',id).del().returning('*');
  },
  deleteAuthor: id => {
    return knex('authors').where('id',id).del().returning('*');
  }
}
