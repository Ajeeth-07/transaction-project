const express = require("express");
const { authMiddleware } = require("../middleware");
const mongoose = require("mongoose");
const {Account, Transaction} = require("../db");

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

    //save transaction
    const transaction = new Transaction({
      senderId : req.userId,
      receiverId : to,
      amount,
      statuss : "success"
    });

    await transaction.save({session})

    await session.commitTransaction();
    res.status(200).json({msg:"Transfer Successful"});
    }catch(err){
        console.error("Error: " + err);
        return res.status(500).json({msg:"Internal Server Error"});
    }
    
});

router.get("/history", authMiddleware, async(req, res) => {

  try{
    const history = await Transaction.find({
    $or : [{senderId: req.userId}, {receiverId : req.userId}] //query to get money sent and recieved by user
  }).sort({timestamp: -1}); //this sort.timestamp -1 returns transactions in descending order most recent transaction at top

  res.status(200).json({history});
  }catch(err){
    console.error("Error: " + err);
    res.status(500).json({msg : "Internal server error"});
  }

  
})


module.exports = router;
