const express = require('express');
const router = express.Router(); // here we will use all routes like get and post routes
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jt = require('jsonwebtoken');
const { JT_SECRET } = require('../keys');
const login = require('../middleware/login')

router.get('/', (req, res) => {

    res.send("hello this is main directory");
})

// route for signup
router.post('/signup', (req, res) => {

    const { name, email, password, pic } = req.body;
    if (!email || !password || !name) {
        return res.status(422).json({ "error": "Please add all the fields" })
    }
    res.json({ "message": "successfully posted the data" })
    User.findOne({ email: email }).then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({ "error": "User already exist with that email" })
        }
        bcrypt.hash(password, 11)
            .then(hashedpassword => {

                const user = new User({
                    email,
                    password: hashedpassword,
                    name,
                    pic
                })

                user.save().then((user) => {
                    res.json({ message: "saved successfully" })
                }).catch(err => { console.log(err) })
            })


    }).catch(err => { console.log(err) })
})




router.get('/privateData',login, (req,res)=>{

    res.send("hello user this is private data")
})




//route for signin
router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(422).json({ "error": "password or email is missing" });
    }
    User.findOne({ email: email }).then((savedUser) => {
        if (!savedUser) {
            res.status(422).json({ "error": "Invalid password or Eamil" });
        }
        bcrypt.compare(password, savedUser.password).then(matched => {
            if (matched) {
                //res.json({ "message": "successfully signed in" })
                const token = jt.sign({_id:savedUser._id},JT_SECRET);
                const {_id,name,email,followers,following,pic} = savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else {
                 res.status(422).json({"error":"Invalid password or Eamil"});
                

            }
        }).catch(err => { console.log(err) })
    })





    // testing

    // "email": "nomi@ibsSucker.com",
    // "password":"wawawawa"


})



module.exports = router;