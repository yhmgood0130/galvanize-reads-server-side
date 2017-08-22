const express = require ('express')
const router = express.Router();
const knex = require ('../db/knex')
const queries = require ('../db/queries')

router.get('/all', (req,res,next) => {
  queries.getAllBooks().then(books => {
    res.status(200).json(books);
  })
})

module.exports = router;
