const Joi = require("joi");
const express = require("express");
const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", async(req, res) => {

    //Validate
    const schema = Joi.object({
        email : Joi.string().min(3).max(200).email().required(),
        password : Joi.string().min(6).max(200).required()
    });
    const {error} =  schema.validate(req.body);

    if(error) {return res.status(400).send("Invalid Email Id or Password")}

    try{
        let user = await User.findOne({email : req.body.email});

        if(!user) {return res.status(400).send("User Does not exists")};

        let validPassword = await bcrypt.compare(req.body.password, user.password);

        if(!validPassword) {return res.status(400).send("Incorrect Password")}

        //Create JWT Token
        const key = process.env.SECRET_KEY
        const token = jwt.sign({_id : user._id, name : user.name, email : user.email}, key);

        res.send(token);
    }
    catch(error) {
        res.status(500).send(error.message);
    }

});

module.exports = router;