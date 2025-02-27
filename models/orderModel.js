const mongoose = require('mongoose')
const joi = require('joi');
const orderSchema = mongoose.Schema({
    productId:{
        type:mongoose.Types.ObjectId,
        ref:"products"
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    Qty:Number,
    accountNo:Number,
    amount:Number,
    TotalAmount:Number,
    Status:{
        type: String,
        enum:["pending","paid","completed"],
        default:"pending"
    },
    paymentMethod : {
        type: String,
        default: ""
    },

    
},{timestamps:true})

function ValidateOrder(body){
    const order = joi.object({
        productId:joi.string().required(),
        Qty:joi.number().required(),
        paymentMethod:joi.string(),
        accountNo:joi.string(),
        amount:joi.number(),
        // productId:joi.string().required(),
    })
    return order.validate(body)
    }
const orderModel = mongoose.model('order',orderSchema)

module.exports = {orderModel,ValidateOrder}
