const express = require('express')
const {deleteCategory,getCategory,createCategory,updateCategory} = require('../controllers/CategoryCtrl')
const { auth } = require('./middleware/auth')
// const { auth } = require('../index')
// const { auth } = require('./middleware/auth')
const route = express.Router()

route.get('/',getCategory)
route.post('/',auth(['admin',]),createCategory)
route.put('/:id',auth(['admin','user']),updateCategory)
route.delete('/:id',auth(['admin',]),deleteCategory)

module.exports = route