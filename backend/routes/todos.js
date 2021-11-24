const {Todo} = require("../models/todos");
const express = require("express");
const Joi = require("joi");  //For data validation and manipulation
const { bool } = require("joi");
const auth = require("../middleware/auth");

const router = express.Router();

//To handle Get Request
router.get("/", auth, async(req, res) => {
    try
    {
        const todos = await Todo.find()
        .sort({
            date : -1
        });
        res.send(todos);
    } 
    catch (error) {
        res.status(500).send(error.message);
        console.log(error.message);
    }
});

//To handle Post Request
router.post("/", auth, async(req, res) => {
    //Joi Schema
    const schema = Joi.object({
        name : Joi.string().min(3).max(200).required(),
        author : Joi.string().min(3).max(30),
        uid : Joi.string(),
        isComplete : Joi.boolean(),
        date : Joi.date()
    });

    //Validate the schema
    const { error } = schema.validate(req.body);

    if(error) {return res.status(400).send(error.details[0].message)}

    //Extract all the necessary params from request body to pass directly to model
    const {name, author, isComplete, date, uid} = req.body;

    let todo = new Todo({
        //If not extract as shown above, to be passed like this
        //name : req.body.name, and so on....
        name, author, isComplete, date, uid
    })

    //Save Document to database, this is async method. So used with either async await or with then
    /*
    todo.save().then(todo => {
        res.send(todo)
    }).catch((err) => {console.log(`Error: ${err.message}`)});
    */

    try{
        todo = await todo.save();
        res.send(todo);
    }
    catch(error) {
        console.log(`Error : ${error}`);
        res.status(500).send(error.message)    //Set Request status if anything went wrong
    }
});

//To handle Put Request (For Updating whole Document)
router.put("/:id", auth, async(req, res) => {
    const schema = Joi.object({
        name : Joi.string().min(3).max(200).required(),
        author : Joi.string().min(3).max(30),
        uid : Joi.string(),
        isComplete : Joi.boolean(),
        date : Joi.date()
    });

    //Validate the schema
    const { error } = schema.validate(req.body);

    if(error) {return res.status(400).send(error.details[0].message)}

    try{
    //Check whether particular todo exists or not
        const findTodo = await Todo.findById(req.params.id);

        if(!findTodo) return res.status(404).send("Todo not found");

        const {name, author, isComplete, date, uid} = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {name, author, isComplete, date, uid}, {
            new : true
        });
        res.send(updatedTodo);
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

//To handle Patch Request (For Updating particualr property of Document)
router.patch("/:id", auth, async(req, res) => {
   
    try {
        //Check whether particular todo exists or not
        const findTodo = await Todo.findById(req.params.id);

        if(!findTodo) return res.status(404).send("Todo not found");

        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {isComplete : !findTodo.isComplete});
        res.send(updatedTodo);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

//To handle Delete Request
//Remove "id" from request URL for testing first two cases
router.delete("/:id", auth, async(req, res) => {
    //deleteOne Method()
    //Check whether particular todo exists or not
    
    /*
    try {
        const findTodo = await Todo.findById(req.params.id);

        if(!findTodo) return res.status(404).send("Todo not found");

        const todo = await Todo.deleteOne({isComplete : true});
        res.send(todo);
    }
    catch (error) {
        res.status(500).send(error.message);
    }*/

    //deleteMany()
    /*
    try {
        const findTodo = await Todo.findById(req.params.id);

        if(!findTodo) return res.status(404).send("Todo not found");

        const todo = await Todo.deleteMany({isComplete : false});
        res.send(todo);
    }
    catch (error) {
        res.status(500).send(error.message);
    }*/

    //FindbyIdandDelete()
    try {
        const findTodo = await Todo.findById(req.params.id);

        if(!findTodo) return res.status(404).send("Todo not found");

        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        res.send(deletedTodo);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;