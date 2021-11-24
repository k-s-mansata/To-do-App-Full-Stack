const Joi = require("joi");
const express = require("express");
const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", async(req, res) => {
    const schema = Joi.object({
        name : Joi.string().min(3).max(30).required(),
        email : Joi.string().min(3).max(200).email().required(),
        password : Joi.string().min(6).max(200).required()
    });
    const {error} =  schema.validate(req.body);

    if(error) {return res.status(400).send(error.details[0].message)}

    //Check if user exists or not
    try{
        let user = await User.findOne({email : req.body.email});

        if(user) {return res.status(400).send("User with same email id exists already, Please use another email Id")};
        
        const {name, email, password} = req.body;

        user = new User({
            name, email, password
        });

        //Password hashing
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt); //Encrypt the password

        await user.save();

        //Login the created user and send jwt token
        const key = process.env.SECRET_KEY
        const token = jwt.sign({_id : user._id, name : user.name, email : user.email}, key);

        res.send(token);
        //res.send("User Created");

    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;