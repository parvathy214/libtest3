const mongoose= require('mongoose')
const Schema = mongoose.Schema

const book = new Schema({
    Book:String,
    Author:String,
    Language:String,
    Genre:String,
    image:String
})
const BookData = mongoose.model('book',book);
module.exports = BookData