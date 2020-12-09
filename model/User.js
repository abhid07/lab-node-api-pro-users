const mongoose = require('../config/db'), Schema = mongoose.Schema

//Creating Schema 

const UserDetail = new Schema({
    name: String,
    email: String,
    age: Number,
    prograd_id: Number,
    squad: Number
})

const User = mongoose.model('User',UserDetail)

module.exports = {User};