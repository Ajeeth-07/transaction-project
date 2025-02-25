const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://shindeajeeth143:ajeeth123@paytm-proj.stx3e.mongodb.net/paytm-server"
);


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        minLength : 3,
        maxLength : 30
    },
    firstName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 30
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 30
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    }
});


const User = mongoose.model("User", userSchema);

module.exports={User};