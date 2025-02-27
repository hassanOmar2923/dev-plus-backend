const mongoose = require('mongoose');
const joi = require('joi');

const CategorySchema = mongoose.Schema({
    Cname:String
},{timestamps:true})

const CategoryModel = mongoose.model('Category',CategorySchema)

function ValidateCategory(body){
const category = joi.object({
    Cname:joi.string().required(),
})
return category.validate(body)
}


module.exports = {CategoryModel,ValidateCategory}