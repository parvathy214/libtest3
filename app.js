const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const app =express();



app.use(cors());
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const mongoose = require('./db')
const api = require('./routes/api')
app.use('/api',api)


const path = require('path'); 
app.use(express.static('./dist/frontend'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
     });   
//authentication
// app.post('/auth')



app.listen(3000,()=>{
    console.log("server running at 3000")
})