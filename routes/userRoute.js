const express = require('express')
const { createUser,Login } = require('../controllers/userCtrl')
const route = express.Router()

route.post('/',createUser)
route.post('/login',Login)

module.exports = route