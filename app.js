const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const books = require('./routes/books')
const authors = require('./routes/authors')
const port = process.env.PORT || 8080
const app = express();

app.use(cors());

app.use(function(req, res, next) {
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
        if (req.method === 'OPTIONS') return res.send(200)
    }
    next()
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/books',books);
app.use('/authors',authors)

app.listen(port);

module.exports = app;
