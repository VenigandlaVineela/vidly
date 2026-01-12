const jwt=require('jsonwebtoken');
const auth=require('../middleware/auth');
const config=require('config');
const bcrypt = require('bcrypt');
const _ = require("lodash");
const { User, validate } = require('../models/user');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//get
router.get('/me',auth,async(req,res)=>{
     const user= await User.findById(req.user._id).select('-password');
res.send(user);
})

//post
router.post('/', async (req, res) => {
     const { error } = validate(req.body);
     if (error) return res.status(400).send(error.details[0].message);

     let user = await User.findOne({ email: req.body.email });
     if (user) return res.status(400).send("User already registered");

     user = new User(_.pick(req.body, ['name', 'email', 'password']));

     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(user.password, salt);
     //{ name: req.body.name,
     // email: req.body.email,
     // password: req.body.password }

     await user.save();
     // res.send(user);
     const token=user.generateAuthToken();
     // const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'))
     res.header('x-auth-token',token).send(_.pick(user, ['name', 'email']));
     //or
     // res.send({
     //      name:user.name,
     //      email:user.email
     // });
});

module.exports = router;
