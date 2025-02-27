
const jwt = require('jsonwebtoken')
const { userModel } = require('../../models/userModel')
// const { userModel } = require('./models/userModel')
const auth = (role)=>{
    // console.log(role)
    return async(req,res,next)=>{
        const token = req.headers['token']
        if(!token) return res.status(403).send({status:false,message:"you are not authenticated"})
        jwt.verify(token,"Q1LN.CSS9CzojkcGuQsjdRjBm513fbd9e57f0957e656ecommerce",async (err,decoded)=>{
    if(err) return res.status(401).send({status:false,message:"invalid token"})
        const loggedinUserData = await userModel.findById(decoded.id)
     if(!loggedinUserData) return res.status(401).send({status:false,message:"user not exist"})
    console.log("loggedinUserData",loggedinUserData.role, role)
    if(!role.includes(loggedinUserData.role)) return res.status(401).send({status:false,message:"un-autherized"+"the required role is "+role+" and ur role is "+loggedinUserData.role})
        // console.log(token)
         req.user = loggedinUserData
        next()
    })
        
    }
}

module.exports = {auth}