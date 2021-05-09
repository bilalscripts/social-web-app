const express = require('express');
const router = express.Router(); // here we will use all routes like get and post routes

router.get('/',(req,res)=>{

    res.send("hello this is main directory");
})


router.post('/signup',(req,res)=>{
    
    const {name,email,password} = req.body;
    if(!email || !password || !name){
       return res.status(422).json({"error": "Please add all the fields"})
    }
    res.json({"message":"successfully posted the data"})
})


module.exports = router;