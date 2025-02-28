const express = require("express");
const { authMiddleware } = require("../middleware");
const mongoose = require("mongoose");
const {Account} = require("../db");

const router = express.Router();


router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });
    res.status(200).json({
      balance: account?.balance || 0
    });
  } catch (err) {
    console.error("Error: " + err);
    return res.status(500).json("Internal server error");
  }
});


//transactions in db

router.post("/transfer", authMiddleware, async(req, res) => {
    try{
        const session = await mongoose.startSession();

    session.startTransaction();
    const {amount, to} = req.body;

    //fetching the accounts within the transaction
    const account = await Account.findOne({userId:req.userId}).session(session);

    if(!account || account.balance <  amount){
        await session.abortTransaction();
        return res.status(400).json({msg : "Insufficient Balance"});
    }

    const toAccount = await Account.findOne({userId : to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({msg : "Invalid Account"});
    }

    //perform the transfer

    await Account.updateOne({userId:req.userId}, {$inc:{balance:-amount}}).session(session);
    await Account.updateOne({userId:to}, {$inc:{balance:amount}}).session(session);

    await session.commitTransaction();
    res.status(200).json({msg:"Transfer Successful"});
    }catch(err){
        console.error("Error: " + err);
        return res.status(500).json({msg:"Internal Server Error"});
    }
    
})


module.exports = router;
