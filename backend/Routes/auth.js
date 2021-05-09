const express = require('express');
const router = express.Router(); // here we will use all routes like get and post routes
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/',(req,res)=>{

    res.send("hello this is main directory");
})


router.post('/signup',(req,res)=>{
    
    const {name,email,password} = req.body;
    if(!email || !password || !name){
       return res.status(422).json({"error": "Please add all the fields"})
    }
    res.json({"message":"successfully posted the data"})
    User.findOne({email: email}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({"error": "User already exist with that email"})
        }
        const user = new User({
            email,
            password,
            name
        })

        user.save().then((user)=>{
            res.json({message:"saved successfully"})
        }).catch(err=>{console.log(err)})
    }).catch(err=>{console.log(err)})
})


module.exports = router;