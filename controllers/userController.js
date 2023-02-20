const express = require("express");
const asyncHandler = require("express-async-handler")
const User = require("../model/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a User
const registerUser = asyncHandler( async (req,res) => {
    const { username , email , password } = req.body;
    if(!username || !email || !password ) {
        res.status(404);
        throw new Error("All feilds are mandatory....");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable) {
        res.status(404);
        throw new Error("User already exists...");
    } 
     // hash password:-
     const hashedPassword = await bcrypt.hash(password, 10);
     const user = await User.create({ username , email , password:hashedPassword});
     if(user) {
        res.status(201).json({_id:user.id , email: user.email})
     }
     else {
          res.status(404);
          throw new Error("User Data Not valid..");
     }
     console.log("user created ",user);
})


// login User functionality :-
const loginUser = asyncHandler(async (req,res) => {
    const { email , password } = req.body;
    if(!email || !password) {
        res.status(404);
        throw new Error("All Feilds are mandatory..");
    }
    const user = await User.findOne( {email} );
    // compare password with hashed password:-
     if( user && (await bcrypt.compare(password , user.password))) {
        const accessToken = jwt.sign({
             user: {
                username:user.username,
                email : user.email , 
                id : user.id
             }
        },process.env.SECRET_ACCESS_TOKEN,
        {
            expiresIn : "30min"
        }
        ) 
        res.status(200).json({ accessToken })
     } 
     else {
        res.status(401)
        throw new Error("Email or Password Invalid ...");
     }
})


// Current User :-
// validate with private routes: -

const currentUser = asyncHandler(async (req,res) => {
    res.json(req.user);
  
})


module.exports = {registerUser,loginUser, currentUser}