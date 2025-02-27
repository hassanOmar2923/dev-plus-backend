const {orderModel,ValidateOrder} = require('../models/orderModel')
const { productsModel } = require('../models/productModel')
const waafipay =require('waafipay-sdk-node').API("API-69429711AHX","1007632","M0913716",
    {testMode :true}
)
const getOrder = async(req,res)=>{

    try {
        const order =await orderModel.find().populate({
            path:"userId",
            model:"user",
            select:"name"
        }).populate({
            path:"productId",
            model:"products",
            select:"Pname Pprice"
        })

        res.send(order)
        
    } catch (error) {
        res.send(error.message)
    }
}

const getOrderByUser = async(req,res)=>{
console.log("reached")
    try {
        const order =await orderModel.find({userId:req.user._id}).populate({
            path:"userId",
            model:"user",
            select:"name"
        }).populate({
            path:"productId",
            model:"products",
            select:"Pname Pprice"
        })

        console.log("reached",order)
        res.send(order)
        
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
}


const createorder = async(req,res)=>{
    try {
        // return console.log("userka hadda ku jiro", req.user)
        const {error} = ValidateOrder(req.body)
        if(error) return res.send({status:false,message:error.message})
            await waafipay.preAuthorize({
                paymentMethod: "MWALLET_ACCOUNT",
                accountNo: req.body.accountNo,
                amount: parseFloat(req.body.amount),
                currency: "USD",
                description: "purchase product"
            }, function(err,ress){
        console.log("first", ress)
        // return res.status(201).json({mess: ress.responseMsg})
        if(ress.errorCode=="0"){
        console.log("ressult",ress)
        waafipay.preAuthorizeCommit({
                    transactionId: ress?.params?.transactionId,
                    description: "commited",
                }, async function(err, res){
                    const findTheProduct = await productsModel.findById(req.body.productId)
                    const totalAmount =parseFloat(findTheProduct.Pprice)* parseInt(req.body.Qty)
                    req.body.TotalAmount =totalAmount
                    req.body.userId = req.user._id
                    req.body.Status = "paid"
                 //    req.body.price =findTheProduct.Pprice 
                     new orderModel(req.body).save()
                     // console.log(totalAmount)
                    //  res.send({status:true,message:"successfully created order"})
                })
        return res.status(201).json({message: `successfully created order"`,status:true})
        
        }
        else{
          waafipay.preAuthorizeCancel({
            transactionId: ress?.params?.orderId,
            description: "cancellation",
        }, function(err, res){
            console.log("calnceled", res)
        })
        console.log("Payment Failed",ress.responseMsg)
        // return;
        return res.status(400).json({error: ress.responseMsg})
        
        }
    })
        
        
    } catch (error) {
        res.send({status:false,message:error.message})
    }
}

const updateorder = async (req,res)=>{

    try {
        const {error} = ValidateOrder(req.body)
        if(error) return res.send({status:false,message:error.message})
        await  orderModel.findByIdAndUpdate(req.params.id,req.body)
        res.send({status:true,message:"success"})
    } catch (error) {
        res.send({status:false,message:error.message})
    }
}

const deleteorder =async (req, res) => {

    try {
        await orderModel.findByIdAndDelete(req.params.id)
        res.send({status:true,message:"success"})
    } catch (error) {
        res.send({status:false,message:error.message})
    }
}


module.exports = {getOrder,createorder,updateorder,deleteorder,getOrderByUser}