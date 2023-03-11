const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    history:[{
        type: String,
        default: "No History"
    }] 

},{timestamps: true})

module.exports = mongoose.model('User_Schema2', userSchema);