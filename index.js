const express = require('express')
const joi = require('joi')
const app =express()
app.use(express.json())
const {productsModel}= require('./models/productModel')
const productRoutesDevplus = require('./routes/productRoute')
const categoryRoutesDevplus = require('./routes/categoryRoute')
const userRoutesDevplus = require('./routes/userRoute')
const orderRoutesDevplus = require('./routes/orderRoute')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { userModel } = require('./models/userModel')
const { auth } = require('./routes/middleware/auth')
// const { auth } = require('./routes/middleware/auth')
// const { productsModel } = require('./models/productModel')
mongoose.connect("mongodb://localhost:27017/e-commerce")
.then(()=>console.log("connected successfully"))
.catch(()=>console.log("!not Connected"))

const cors = require('cors')
app.use(cors())

app.get('/trendingproducts',async(req,res)=>{
    // console.log(req.body)
const data =await productsModel.find().limit(4).sort({createdAt:-1}).populate({
    path:"Category",
    model: "Category",
    
})


// const menProducts = [
//     { Pname: "Men's Classic T-Shirt", Pprice: 19.99, Category: "67b58c7d7551e548088f1ac2" },
//     { Pname: "Men's Slim Fit Jeans", Pprice: 49.99, Category: "67b58c7d7551e548088f1ac2" },
//     { Pname: "Men's Casual Sneakers", Pprice: 59.99, Category: "67b58c7d7551e548088f1ac2" },
//     { Pname: "Men's Leather Jacket", Pprice: 129.99, Category: "67b58c7d7551e548088f1ac2" },
//     { Pname: "Men's Formal Shirt", Pprice: 39.99, Category: "67b58c7d7551e548088f1ac2" },
//     { Pname: "Men's Sports Watch", Pprice: 89.99, Category: "67b58c7d7551e548088f1ac2" },
//     { Pname: "Men's Hoodie", Pprice: 29.99, Category: "67b58c7d7551e548088f1ac2" },
//     { Pname: "Men's Denim Jacket", Pprice: 79.99, Category: "67b58c7d7551e548088f1ac2" },
//     { Pname: "Men's Swim Trunks", Pprice: 24.99, Category: "67b58c7d7551e548088f1ac2" },
//     { Pname: "Men's Casual Loafers", Pprice: 69.99, Category: "67b58c7d7551e548088f1ac2" }
//   ];
// await   productsModel.insertMany(menProducts)

    res.send(data)

})

 
app.use('/users',userRoutesDevplus)

// app.use()



function ValidateProducts(body){
    const product = joi.object({
        Pname:joi.string().required(),
        Pprice:joi.number().required(),
        Category:joi.string().required()
    })
   return product.validate(body)
}

app.use('/order',orderRoutesDevplus)
app.use('/pr',productRoutesDevplus)
app.use('/category',categoryRoutesDevplus)


// app.post('/products',async(req,res)=>{
//     // console.log(req.body)

//     const {error} =  ValidateProducts(req.body)
//     if(error) return res.send(error.message)
//     new productsModel({
//         Pname:req.body.Pname,
//         Pprice:req.body.Pprice,
//         Category:req.body.Category
//     }).save()

//     res.send('waad mahadsantahy, walagu save gareeyay')

// })

app.put('/products/:id',async(req,res)=>{
    console.log(req.params.id)
    await productsModel.findByIdAndUpdate(req.params.id,{
        Pname:req.body.Pname,
        Category:req.body.Category,
        Pprice:req.body.Pprice
    })

    res.send('waad mahadsantahy, walagu update gareyay')
})

app.get('/',async(req,res)=>{
res.send(
    "wuu shaqeynayaa"
)

})

app.get('/products',async(req,res)=>{

    const products = await productsModel.find().populate({
        path:"Category",
        model:"Category",
        select:"-_id Cname"

    })

    res.send(products)
})



app.delete('/products/:id',async(req,res)=>{

    await productsModel.findByIdAndDelete(req.params.id)

    res.send('waad mahadsantahy, walagu delete-gareeyay')
})


app.get('/products/:id',async(req,res)=>{
    const product = await productsModel.findById(req.params.id)
    res.send(product)
})


// MVC  Model Controller Routes
// Validations Joi
// Authentication login/sign in
// Hashing Password using bcrypt
//  JWT JsonWebToken

// Order 
// Autherization  




// const products =[
//     {
//         id:1,
//         Pname:"Kabo",
//         Pprice:10,
//         Category:"men"
//     },
//     {
//         id:2,
//         Pname:"Baati",
//         Pprice:9,
//         Category:"women"
//     },
//     {
//         id:3,
//         Pname:"Surwaal",
//         Pprice:7,
//         Category:"women"
//     },
// ]










// app.get('/products/',(req,res)=>{
//     // const pfilter = products.filter(p=>p.Category==req.params.Category)
//     res.send(products)
// })

// app.post('/products/post',(req,res)=>{
//     console.log(req.body)
//     products.push(req.body)
//     res.status(201).send('successfuly saved')
// })



















// const data = [
//     {
//       "userId": 1,
//       "id": 1,
//       "title": "delectus aut autem",
//       "completed": false
//     },
//     {
//       "userId": 1,
//       "id": 2,
//       "title": "quis ut nam facilis et officia qui",
//       "completed": false
//     },
//     {
//       "userId": 1,
//       "id": 3,
//       "title": "fugiat veniam minus",
//       "completed": false
//     },
//     {
//       "userId": 1,
//       "id": 4,
//       "title": "et porro tempora",
//       "completed": true
//     },
//     {
//       "userId": 1,
//       "id": 5,
//       "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
//       "completed": false
//     },
//     {
//       "userId": 1,
//       "id": 6,
//       "title": "qui ullam ratione quibusdam voluptatem quia omnis",
//       "completed": false
//     },
//     {
//       "userId": 1,
//       "id": 7,
//       "title": "illo expedita consequatur quia in",
//       "completed": false
//     },
//     {
//       "userId": 1,
//       "id": 8,
//       "title": "quo adipisci enim quam ut ab",
//       "completed": true
//     },
//     {
//       "userId": 1,
//       "id": 9,
//       "title": "molestiae perspiciatis ipsa",
//       "completed": false
//     },
//     {
//       "userId": 1,
//       "id": 10,
//       "title": "illo est ratione doloremque quia maiores aut",
//       "completed": true
//     },
//     {
//       "userId": 1,
//       "id": 11,
//       "title": "vero rerum temporibus dolor",
//       "completed": true
//     },
//     {
//       "userId": 1,
//       "id": 12,
//       "title": "ipsa repellendus fugit nisi",
//       "completed": true
//     },
//     {
//       "userId": 1,
//       "id": 13,
//       "title": "et doloremque nulla",
//       "completed": false
//     },
//     {
//       "userId": 1,
//       "id": 14,
//       "title": "repellendus sunt dolores architecto voluptatum",
//       "completed": true
//     },
//     {
//       "userId": 1,
//       "id": 15,
//       "title": "ab voluptatum amet voluptas",
//       "completed": true
//     },
//     {
//       "userId": 1,
//       "id": 16,
//       "title": "accusamus eos facilis sint et aut voluptatem",
//       "completed": true
//     }
//   ]

// app.get('/todos/:cadeyn',(req,res)=>{
//     // console.log(req.params)
//     const xogtaLakalaSoocay= data.filter(d=>d.id == parseInt(req.params.cadeyn))
//     res.send(xogtaLakalaSoocay)
// })

// const port = 3001
require('dotenv').config()
app.listen(process.env.PORT, ()=>{
    console.log("listening on port"+process.env.PORT)
})

// console.log("Hello world!")

