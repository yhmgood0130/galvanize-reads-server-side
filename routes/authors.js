const express = require ('express')
const router = express.Router();
const knex = require ('../db/knex')
const queries = require ('../db/queries')


// router.get('/all', (req,res,next) => {
//   queries.getAllAuthors().then(authors => {
//     res.status(200).json(authors);
//   })
// })

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
  queries.addAuthor(newAuthor).then(authors => {
    res.status(200).json(authors[0]);
  })
})

router.put('/:id/edit', (req,res,next) => {
  let id = req.params.id;
  let edit = req.body;
  queries.editAuthor(edit,id).then(Authors => {
    res.status(200).json(Authors[0]);
  })
})

router.delete('/:id', (req,res,next) => {
  let id = req.params.id;
  queries.deleteAuthor(id).then(Authors => {
    res.status(200).json(Authors[0])
  })
})

module.exports = router;
