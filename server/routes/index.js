const route = require('express').Router()

route.get('/', (req, res) => res.send('Hello World!'))

const debtRoutes = require('../routes/Debt');
route.use('/debts', debtRoutes)

const transactionRoutes = require('../routes/Transaction');
route.use('/transactions', transactionRoutes)

const userRoutes = require('../routes/User');
route.use('/users', userRoutes)

module.exports = route;