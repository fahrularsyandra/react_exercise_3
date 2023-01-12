const debtRoute = require('express').Router()
const DebtController = require('../controllers/DebtController');

// debtRoute.get('/', (req, res) => res.send('Hello !'))
debtRoute.get('/', DebtController.get)
debtRoute.post('/', DebtController.create)
debtRoute.get('/:id', DebtController.delete)

module.exports =debtRoute