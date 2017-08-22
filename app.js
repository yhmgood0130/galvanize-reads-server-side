const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const books = require('./routes/books')
const authors = require('./routes/authors')
const port = process.env.PORT || 8080
const app = express();

app.use(cors());


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/books',books);
app.use('/authors',authors)

app.listen(port);

module.exports = app;
