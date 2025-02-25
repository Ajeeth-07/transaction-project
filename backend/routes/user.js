const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../db");
const { JWT_SECRET } = require("../config");
const app = express();

app.post("/signup", async(req, res) => {
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.lastName;

    if(!(username && password && firstName)){
        return res.status(403).json({msg : "required field names missing"});
    }

    const existingUser = await User.findOne({username});

    if(existingUser) return res.status(400).json({msg : "username is already taken"});

    await User.create({
        username,
        password
    });

    const token = jwt.sign({username}, JWT_SECRET);

    res.status(200).json({msg : "User created successfully", token})

})


module.exports = router