const { Router } = require('express');
const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId

var {User} = require("../model/User")

router.get('/',(req,res)=>{
    User.find((err,docs)=>{
        if(!err)
        {
            res.send(docs)
        }
        else
        {
            return res.status(500).json({ errorMessage: "The users information could not be retrieved." })
        } 
    })
})

router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    User.findById(req.params.id,(err,docs)=>{
        if(!err)
        {
            res.send(docs)
        }
        else
        {
            res.status(500).json({ errorMessage: "The users information could not be retrieved." })
        }
    })
})
router.post('/',(req,res)=>{

    if(req.body.name == '' || req.body.email=='')
    {
        res.status(400).json({ error: 'Please provide name/email for the user' })
    }
    else
    {
        var user = new User({
            name:req.body.name,
            email: req.body.email,
            age: req.body.age,
            prograd_id: req.body.prograd_id,
            squad: req.body.squad
        })
        user.save((err, docs) => {
            if (!err)
            {  
                res.status(201).json({ User_Created: user })
            }
            else
            {
                res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
            }
        })
    }
})

router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    {
        return res.status(404).json({ message: "The user with the specified ID does not exist."})
    }
    else if (req.body.name == '' || req.body.email == '')
    {
        res.status(400).json({ error: 'Please provide name/email for the user' })
    }
    else
    {
        var user = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            prograd_id: req.body.prograd_id,
            squad: req.body.squad
        }

        User.updateOne({"_id":req.params.id}, user, (err,docs)=>{
            if (err) 
            {
                res.status(500).json({ errorMessage: "The user information could not be modified." })
            }
            else 
            {
                res.redirect(`/user/${req.params.id}`)
            }
        })
    }
})
router.delete('/:id',(req,res)=>{
    if (!ObjectId.isValid(req.params.id))
    {
        res.status(400).json({ error: 'Please enter valid id' })
    }
    else
    {
        User.findByIdAndRemove(req.params.id, (err, docs) => {
            if (!err) 
            { 
                res.status(201).json({ message: "User was deleted Successfully" })
            }
            else
            { 
                res.status(500).json({ errorMessage: "The user could not be removed" })
            }
        })
    }
})

module.exports = router;
