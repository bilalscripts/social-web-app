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
    Post.find().populate('postedBy','_id name')
    .sort("-createdAt").then(posts=>{
        res.json({posts})
    }).catch(err=>{console.log(err)})
})



router.get('/getsubpost',login,(req,res)=>{
    Post.find({postedBy:{$in:req.user.following}}).populate('postedBy','_id name')
    .sort("-createdAt").then(posts=>{
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

router.put('/like',login,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((error,result)=>{
        if(error){
            return res.status(422).json({error})
        }
        else{
                res.json(result)
        }
    })
})



router.put('/unlike',login,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((error,result)=>{
        if(error){
            return res.status(422).json({error})
        }
        else{
                res.json(result)
        }
    })
})


router.put('/comment',login,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy: req.user._id
    }

    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    }).populate("comments.postedBy","_id name")
    .exec((error,result)=>{
        if(error){
            return res.status(422).json({error})
        }
        else{
                res.json(result)
        }
    })
})

router.delete('/deletepost/:postId',login,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString()===req.user._id.toString())
        {
            post.remove()
            .then(result=>{
                res.json(result)
            }).catch(err=>console.log(err))
        }
    })
})







module.exports =  router