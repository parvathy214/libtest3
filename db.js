const mongoose =require('mongoose')
mongoose.connect(`mongodb+srv://p4parvathy214:Lekhaatlas@cluster0.ndcrk8y.mongodb.net/Library?retryWrites=true&w=majority`,{useNewUrlParser: true})
.then(() => 
  console.log('Connected to the database'))
.catch(err =>
  console.error('Error connecting to the database', err));


  module.exports = mongoose;