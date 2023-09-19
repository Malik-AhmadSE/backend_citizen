const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    userName :{type:String,required:true},
    userEmail:{type:String,required:true},
    userPassword:{type:String,required:true},
    userImage:{type:String,default:'http://localhost:8000/files/user.png'},
    Status:{type:String,default:'customer'},
},
    {timestamps:true}
)


// creating model of user

const UserModel=mongoose.model('user',userSchema);
module.exports=UserModel;