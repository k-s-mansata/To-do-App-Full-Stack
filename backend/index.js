//ES6 used to import modules
//Add "type" : "modules" in package.json to use this method
/*
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import {Todo} from "./models/todos.js";

dotenv.config()
*/
//JsModule to used for Import and Export modules
const express = require("express");
const app = express(); //Create express application by invoking express

//require env package for using variables stored in .env file
require("dotenv").config();
const connectionString = process.env.CONNECTION_STRING;

//require mongoose
const mongoose = require("mongoose");

//PORT
const port = process.env.PORT || 3030;

//Importing module
//const Todo = require("./models/todos");

//Use CORS (Cross Origin Resource Sharing)
const cors = require("cors");

//Importing the routes
const todos = require("./routes/todos");
const signUp = require("./routes/signUp");
const signIn = require("./routes/signIn");

//Middlewares
app.use(cors());
app.use(express.json()); //this allows to pass json in request

/*If request url is like "http://localhost:3030/api/todos", /api/todos will be managed by route file, and
default end point will be "/" of route file. */
app.use("/api/todos", todos); 
app.use("/api/signup", signUp);
app.use("/api/signin", signIn);

//variable app will represent express application and will be used further to create routes and other stuff

//First Route
//app.METHOD => Accepts 2 params, first is endpoint and second is callback function. 
//This end point will handle http get request
app.get("/", (req, res) => {
    res.send("Welcome to our todos API") //Sending Response to client
}); //Arrow function as callback function 

//Listening to the port
//app.listen => takes to params, first one is port number and another one is for logging (usually on console)
app.listen(port, () => {
    console.log(`Server is running port ${port}`);
    //console.log(Todo)
}); //Visit to http://localhost:3030/ for demo

//Connect to Mongo DB
//This then method will be called after returning from mongoose.connect()
//Catch block will handle exception
mongoose.connect(connectionString, {
    //Options to avoid Duplication errors
    useNewUrlParser : true,
    //useCreateIndex : true,
    useUnifiedTopology : true
}).then(() => {
    console.log("Connected to MongoDB...")
}).catch((err) =>{
    console.log("Failed to connect Mongo :" + err)
})

