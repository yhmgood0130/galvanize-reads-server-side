const express = require ('express')
const router = express.Router();
const knex = require ('../db/knex')
const queries = require ('../db/queries')

router.get('/all', (req,res,next) => {
  queries.getAllBooks().then(books => {
    return Promise.all(books.map(book => {
      return queries.getAuthorsByBook(book.id)
        .then(author => {
          book.author = author;
          return book;
        })
    }))
  }).then(books => {
    res.status(200).json(books);
  })
})

router.post('/new', (req,res,next) => {
  let newBook = req.body;
  queries.addBook(newBook).then(books => {
    res.status(200).json(books[0]);
  })
})

router.put('/:id/edit', (req,res,next) => {
  let id = req.params.id;
  let edit = req.body;
  queries.editBook(edit,id).then(books => {
    res.status(200).json(books[0]);
  })
})

router.post('/:id/editAuthors', (req,res,next) => {
  let id = req.params.id;
  let authors = req.body;
  console.log(authors);
  queries.deleteAuthorForBook(id).then(data => {
    queries.addAuthorForBook(authors).then(update => {
      res.status(200).json(update[0]);
    })
  })
})

router.post('/addAuthors', (req,res,next) => {
  let authors = req.body;
    queries.addAuthorForBook(authors).then(update => {
      res.status(200).json(update[0]);
    })
})

router.delete('/:id', (req,res,next) => {
  let id = req.params.id;
  queries.deleteAuthorForBook(id).then(books => {
      return queries.deleteBook(id);
  }).then(books => {
    res.status(200).json(books[0])
  })
})

module.exports = router;
