const express = require('express')
const {getOrder,createorder,updateorder,deleteorder, getOrderByUser} = require('../controllers/OrderCtrl')
const { auth } = require('./middleware/auth')
// const { auth } = require('./middleware/auth')
// const { auth } = require('../index')
// const { auth } = require('./middleware/auth')
const route = express.Router()

route.get('/',getOrder)
route.get('/byloggedInUser',auth(['admin','user']),getOrderByUser)
route.post('/',auth(['admin','user']),createorder)
route.put('/:id',auth(['admin','user']),updateorder)
route.delete('/:id',auth(['admin','user']),deleteorder)

module.exports = route