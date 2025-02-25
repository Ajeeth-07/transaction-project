const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {User} = require("../db");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");

router.post("/signup", async(req, res) => {
    try{
        const {username, firstName, lastName, password} = req.body;

    if(!(username && password && firstName)){
        return res.status(403).json({msg : "required field names missing"});
    }

    const existingUser = await User.findOne({username});

    if(existingUser) return res.status(400).json({msg : "username is already taken"});

    const hashedPass = await bcrypt.hash(password, 10);

    await User.create({
        username,
        firstName,
        lastName,
        password : hashedPass
    });

    const token = jwt.sign({username, id:User._id}, JWT_SECRET);

    res.status(200).json({msg : "User created successfully", token})
    }catch(error){
        console.error("Error during signup:", error);
        res.status(500).json({msg : "Internal Server Error"});
    }
    

})

router.post("/signin", async(req, res) => {
    try{
        const {username, password} = req.body;

    if(!(username && password)){
        res.status(500).json({msg : "username and password required"});
    }

    //finding username
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).json({msg : "Invalid credentials"});
    }

    //comparing pass
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({msg:"Invalid credentials"});


    const token = jwt.sign({id:user._id, username}, JWT_SECRET);

    res.status(200).json({msg : "Signin Successfull", token});
    }catch(err){
        console.error("Error signing in "+ err);
        res.status(404).json({msg: "Internal Server error"});
    }
    
})


module.exports = router