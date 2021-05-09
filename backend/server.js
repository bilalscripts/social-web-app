const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys')
require('./models/user');
// now we can use this model easily like this:
// mogoose.model('User');

// using middlewares
app.use(express.json()) // sending requst data to the json , it must be used before the route because before handling request it sends data to the route, otherwise we will get error

app.use(require('./Routes/auth'))


// connecting with atlas mongo
mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    console.log('connection done')
});

mongoose.connection.on('error',(err)=>{
    console.log('error in connection',err);
})




// listenig to port
const port =5000
app.listen(port, ()=>{
    console.log('server is running on: '+ port);
})