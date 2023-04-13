const express = require ('express');
const BookData = require('../model/books')
const SignupData = require("../model/signup")
var router = express.Router();
const jwt = require('jsonwebtoken')
const signup = require('./login')
router.use('/signup',signup)
// const api = require('./routes/api')
// router.use('/api',api)


function verifyToken(req,res,next) {

    try {
        console.log()
        if (!req.headers.authorization) throw ('unauthorized JWT')
        let token = req.headers.authorization.split(' ')[1]
        if (!token) throw ('unauthorized JWT')

        let payload = jwt.verify(token, 'ilikeapples13')

        if (!payload) throw ('unauthorized JWT')

        // res.status(200).send(payload)
        next()

    } catch (error) {
        console.log(error)
        res.status(401).send(error)
    }



}

//Get Books

router.get('/',async(req,res)=>{
    try {

        let books = await BookData.find();
       res.json({data:books,message:"success"}).status(200)

    } catch (error) {
        console.log(error)
        res.json({message:error}).status(400)
    }
})
//Get one book
router.get('/:id',async(req,res)=>{
    try {
        let id = req.params.id
        let token = req.headers
        let book = await BookData.findOne({_id:id});
       res.json({data:book,message:"success"}).status(200)

    } catch (error) {
        console.log(error)
        res.json({message:error}).status(400)
    }
})


//Add Books

router.post('/',verifyToken,async(req,res)=>{

try {
    let book = req.body;
    let token = req.headers
    console.log('token from front end',token)
    if(book== null) throw ('no data')
    const data= new BookData(book)
    await data.save()
    res.json({ message: 'Data saved successfully' }).status(201)
    
} catch (error) {
    console.log(error)
     res.json({message:error}).status(400)
    
}
    

})


//Update Books
router.put('/:id',verifyToken,async(req,res)=>{
    try {
        let token = req.headers.authorization
        console.log('token from front end',token)
        let book = req.body;
        let id = req.params.id
        const updatedBook = await BookData.findByIdAndUpdate({_id:id},{$set:book})
        res.json({message :'Data updated succesfully'}).status(200)

    } catch (error) {
        console.log(error)
        res.json({message:error}).status(400)
    }
})

//delete books

router.delete('/:id',verifyToken,async(req,res)=>{
    try {
        let token = req.headers.authorization
        console.log('token from front end',token)
        let book = req.body;
        let id = req.params.id
        const updatedBook = await BookData.findByIdAndDelete({_id:id})
        res.json({message :'Data updated succesfully'}).status(200)

    } catch (error) {
        console.log(error)
        res.json({message:error}).status(400)
    }
})


module.exports = router;