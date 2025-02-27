const {CategoryModel,ValidateCategory} = require('../models/categoryModel')

const getCategory = async(req,res)=>{

    try {
        const category =await CategoryModel.find()

        res.send(category)
        
    } catch (error) {
        res.send(error.message)
    }
}


const createCategory = async(req,res)=>{
    try {
        const {error} = ValidateCategory(req.body)
        if(error) return res.send({status:false,message:error.message})
        new CategoryModel(req.body).save()
        res.send({status:true,message:"successfully created category"})
        
    } catch (error) {
        res.send({status:false,message:error.message})
    }
}

const updateCategory = async (req,res)=>{

    try {
        const {error} = ValidateCategory(req.body)
        if(error) return res.send({status:false,message:error.message})
        await  CategoryModel.findByIdAndUpdate(req.params.id,req.body)
        res.send({status:true,message:"success"})
    } catch (error) {
        res.send({status:false,message:error.message})
    }
}

const deleteCategory =async (req, res) => {

    try {
        await CategoryModel.findByIdAndDelete(req.params.id)
        res.send({status:true,message:"success"})
    } catch (error) {
        res.send({status:false,message:error.message})
    }
}


module.exports = {getCategory,createCategory,updateCategory,deleteCategory}