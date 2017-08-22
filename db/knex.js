const environment = 'development'
const configs = require('../knexfile')
const dbconfig = configs[environment]
const knex = require ('knex')
const knexConnection = knex(dbconfig)

module.exports = knexConnection;
