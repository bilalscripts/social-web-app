const jt = require('jsonwebtoken');
const {JT_SECRET} = require("../keys");
const mongoose = require('mongoose');
const User = mongoose.model("User");
module.exports = function(req,res,next){

    const {authorization} = req.headers;
    if(!authorization){
        res.status(401).json({"error":"you must be logged in"});
    }


    // authorization will be like authorization === Bearer djkfakhkkjfhg
    const token = authorization.replace("Bearer ","")
    jt.verify(token,JT_SECRET,(err,payload)=>{
        if(err){
           return res.status(401).json({"error":"you must be logged in"})
        }
        const {_id} = payload; 
        User.findById(_id).then(userData=>{
            req.user = userData;
            next();
        })
    })

}