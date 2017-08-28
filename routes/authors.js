const express = require ('express')
const router = express.Router();
const knex = require ('../db/knex')
const queries = require ('../db/queries')

router.get('/all', (req,res,next) => {
  queries.getAllAuthors().then(author =>{
    return Promise.all(author.map(auth => {
      return queries.getBooksByAuthor(auth.id)
        .then(books => {
          auth.books = books;
          return auth;
        })
    }));
    }).then(author => {
      res.status(200).json(author);
  })
})

router.get('/:id', (req,res,next) => {
  let id = req.params.id;
  queries.getBooksByAuthor(id)
    .then(author => {
      res.status(200).json(author);
  })
})

router.post('/new', (req,res,next) => {
  let newAuthor = req.body;
  queries.addAuthor(newAuthor).then(author => {
    res.status(200).json(author[0]);
  })
})

router.put('/:id/edit', (req,res,next) => {
  let id = req.params.id;
  let edit = req.body;
  queries.editAuthor(edit,id).then(author => {
    res.status(200).json(author[0]);
  })
})

router.post('/:id/editBooks', (req,res,next) => {
  let id = req.params.id;
  let books = req.body;
  console.log(id, books);
  queries.deleteBookForAuthor(id).then(data => {
    queries.addBookForAuthor(books).then(update => {
      res.status(200).json(update[0]);
    })
  })
})


router.delete('/:id', (req,res,next) => {
  let id = req.params.id;
  queries.deleteBookForAuthor(id).then(books => {
      return queries.deleteAuthor(id);
  }).then(books => {
    res.status(200).json(books[0])
  })
})

module.exports = router;
