const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post')
const login = require('../middleware/login')
const User = mongoose.model("User") 


router.get('/user/:id',(req,res)=>{
    User.findOne({_id:req.param.id})
    .select("-password")
    .then(user=>{
        Post.find({postedBy:req.param.id}).populate("postedBy","_id name")
        .exec((err,posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user,posts})
        })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})


module.exports =  router