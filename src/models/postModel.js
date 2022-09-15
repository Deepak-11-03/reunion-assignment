
const mongoose =require('mongoose');
 
const postSchema =mongoose.Schema({
    title:String,
    description:String,
    comments:[String],
    likes:{type:Number ,default:0},
    unLikes:{type:Number ,default:0},
    created_at:{type:String , default:new Date().toLocaleString()},
    isDeleted:{
        type:Boolean,
        default:false
    }
})

module.exports =mongoose.model('Post', postSchema)
