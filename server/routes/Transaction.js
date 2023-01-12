const transactionRoute = require('express').Router()
const TransactionController = require('../controllers/TransactionController');

// transactionRoute.get('/', (req, res) => res.send('Hello !'))
transactionRoute.get('/', TransactionController.get)
transactionRoute.get('/:id', TransactionController.delete)
transactionRoute.post('/', TransactionController.create)

module.exports =transactionRoute