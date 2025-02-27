const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://shindeajeeth143:ajeeth123@paytm-proj.stx3e.mongodb.net/paytm-server"
  )
  .then(() => console.log("Connected to db"))
  .catch((err) => console.error("db connection error: " + err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, //reference to User Model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
module.exports = { User, Account };
