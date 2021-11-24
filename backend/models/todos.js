const mongoose = require("mongoose");
//import mongoose from "mongoose";

//Mongoose Schema
const todoSchema = new mongoose.Schema({
    name: {type  : String, required : true, minlength : 3, maxlength : 200},
    author : {type : String, minlength : 3, maxlength : 30},
    uid : String,
    isComplete : Boolean,
    date : {type : Date, default : new Date()}
});

//Mongoose Model : Useful to interact with mongoDB
//obj.model() => first argument = name of collection, second is schema
//Todo is class, so name is capital
const Todo = mongoose.model("Todo", todoSchema)

//Exporting model
exports.Todo = Todo;
//module.exports = Todo;


//For ES6 => export default Todo OR export const Todo = mongoose.model("Todo", todoSchema);