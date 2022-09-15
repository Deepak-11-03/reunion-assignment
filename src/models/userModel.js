const mongoose =require('mongoose');
 
const userSchema =mongoose.Schema({
    name:String,
    email:{type:String , unique:true},
    password:String,
    followers : {type:Number , default : 0},
    following :{type:Number , default : 0}
})

module.exports =mongoose.model('User', userSchema)