const {productsModel} = require('../models/productModel')

const createProduct = (req,res) =>{

    try {
    // console.log(req.body)
        new productsModel(req.body).save()
        res.send('Product created successfully')
    } catch (error) {
        res.send(error.message)
    }

}


module.exports = {createProduct}