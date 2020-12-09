//establishing connection with mongoose

const mongoose = require('mongoose');
const password = "root"
const dbname = "Prouser"

mongoose.connect(`mongodb+srv://Prouser:${password}@cluster0.hhefw.mongodb.net/${dbname}?retryWrites=true&w=majority`,
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:true
})
.then(ok=>console.log("Connected to mongodb"))
.catch(err=>console.log("Error",err))

module.exports = mongoose