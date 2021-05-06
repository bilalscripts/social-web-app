const express = require('express');
require('dotenv').config();
const app = express();

const port = 5000;
app.listen(port, ()=>{
    console.log('server is running on: '+ port);
})