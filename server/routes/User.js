const userRoute = require('express').Router()
const UserController = require('../controllers/UserController');

// userRoute.get('/', (req, res) => res.send('Hello !'))
userRoute.get('/', UserController.getAll)
userRoute.get('/:id', UserController.delete)
userRoute.post('/register', UserController.create)
userRoute.post('/login', UserController.login)

module.exports =userRoute