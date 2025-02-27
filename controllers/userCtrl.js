const { userModel, validateUser, validateLogin } = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const createUser = async(req,res) =>{
    try {
        // const salt = bcrypt.genSalt(10)
        const {error} = validateUser(req.body)
        if(error) return res.send({status:false,message:error.message})
        const hashedPassword =await bcrypt.hash(req.body.password,10)
        // console.log(hashedPassword)
        req.body.password = hashedPassword
        const checkIfUserExits = await userModel.findOne({email:req.body.email})
        if(checkIfUserExits) return res.send({status:false,message:"User already exists"})
        new userModel(req.body).save()
        res.send({status:true,message:"successfuly created user ["+req.body.name+"]"})
    } catch (error) {
        res.send({status:false,message:error.message});
    }

}


const Login =async (req, res) => {
   try {
    const {error} = validateLogin(req.body)
    if(error) return res.send({status:false,message:error.message});
    const checkUser = await userModel.findOne({email:req.body.email})
    if(!checkUser) return res.send({status:false,message:"user or password incorrect😂"})
    const checkpassword =await bcrypt.compare(req.body.password,checkUser.password)
    if(!checkpassword) return res.send({status:false,message:"user or password incorrect😂"})
    
    const token = jwt.sign({id:checkUser._id,email:checkUser.email,name:checkUser.name},"Q1LN.CSS9CzojkcGuQsjdRjBm513fbd9e57f0957e656ecommerce")
    // console.log(token)
    
        res.send({status:true,message:`successfuly Logged in as [${checkUser.name}]`,token:token})

   } catch (error) {
    res.send({status:false,message:error.message});
   }
}




module.exports = {createUser,Login}