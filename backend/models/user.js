const { string } = require("joi");
const mongoose = require("mongoose");

//Creating the user schema
const userSchema = new mongoose.Schema({
    name : {type : String, minlength: 3, maxlength : 30, required : true},
    email : {type : String, minlength: 3, maxlength : 200, required : true, unique : true},
    password : {type : String, required : true, minlength : 6, maxlength : 1024 }
});

//Creating the model
const User =  mongoose.model("User", userSchema);

//Exporting the user model
exports.User = User;