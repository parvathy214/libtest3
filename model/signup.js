const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const signup = new Schema({

    username:String,
    email:String,
    password:String

})
const SignupData = mongoose.model('signup',signup);

module.exports = SignupData;