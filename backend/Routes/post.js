const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post')
const login = require('../middleware/login')


router.post('/createpost',login,(req,res)=>{

    const {photo, body} = req.body;
    console.log(photo)
    console.log(body)
    if(!photo || !body )
    {
       return res.status(422).json({"error":"please add all the fields"});
    }

    req.user.password = undefined;
    const post = new Post({
        
        body,
        photo,
        postedBy: req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    }).catch(err=>{console.log(err)})

})


router.get('/allpost',login,(req,res)=>{
    Post.find().populate('postedBy','_id name').then(posts=>{
        res.json({posts})
    }).catch(err=>{console.log(err)})
})


router.get('/mypost',login,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate('postedBy','_id name')
    .then(myPost=>{
        res.json(myPost);
    }).catch(err=>{console.log(err)})
})



module.exports =  router