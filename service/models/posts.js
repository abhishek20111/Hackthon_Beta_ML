const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const userPost = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    comments:[{
        comment: {type: String},
        postedBy:{type: ObjectId, ref: "User_Schema2"}
    }],
    
    likes:[{
        type:ObjectId,
        ref: "User_Schema2"
    }],
    postedBy: {
        type: ObjectId,
        ref: "User_Schema2"
    }
    
},{timestamps: true})

module.exports = mongoose.model('Post_User2', userPost);