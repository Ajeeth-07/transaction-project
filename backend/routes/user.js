const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {User} = require("../db");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");
const zod = require("zod");
const { authMiddleware } = require("../middleware");
//using ZOD validation


const signupBody = zod.object({
    username : zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string()
})

router.post("/signup", async(req, res) => {
    try{
        const {success} = signupBody.safeParse(req.body);

    if(!success){
        return res.status(403).json({msg : "required field names missing / invalid inputs"});
    }

    const {username, firstName, lastName, password} = req.body;

    const existingUser = await User.findOne({username});

    if(existingUser) return res.status(400).json({msg : "username is already taken"});

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        firstName,
        lastName,
        password : hashedPass
    });

    const token = jwt.sign({username : newUser.username, id:newUser._id}, JWT_SECRET);

    res.status(200).json({msg : "User created successfully", token})
    }catch(error){
        console.error("Error during signup:", error);
        res.status(500).json({msg : "Internal Server Error"});
    }
    

})

const signinBody = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

router.post("/signin", async(req, res) => {
    try{
        const {success} = signinBody.safeParse(req.body);

    if(!success){
        res.status(500).json({msg : "username and password required / invalid inputs"});
    }

    const {username, password} = req.body;

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
    
});

const updatedBody = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})

router.put("/update", authMiddleware, async (req, res) => {
    const {success, data} = updatedBody.safeParse(req.body);

    if(!success) return res.status(411).json({msg:"Invalid inputs"});

    //if user provides password hash it
    if(data.password){
        data.password = await bcrypt.hash(data.password, 10);
    }

    await User.updateOne({_id : req.userId}, {$set: data});

    res.status(200).json({msg : "Updated successfully"});
});

router.get("/bulk", async(req, res) => {
    try{
        const filter = req.query.filter || "";

    const users = await User.find({
        $or : [{
            firstName : {
                "$regex" : filter
            }
        }, {
            lastName : {
                "$regex" : filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id
        }))
    })
    }catch(err){
        console.error("Error : " + err);
        res.status(404).json({msg : "internal server error"});
    }
    
})


module.exports = router