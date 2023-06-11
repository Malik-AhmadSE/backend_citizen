const mongoose=require('mongoose');
const ratingSchema=mongoose.Schema({
    favorite:{type:Boolean,default:false},
    user:{type:mongoose.SchemaTypes.ObjectId,ref:'user',required:true},
    product:{type:mongoose.SchemaTypes.ObjectId,ref:'product',required:true},
    Date:{type:Date,default:Date.now}
},
    {timestamps:true}
)


// creating model of user

const ratingModel=mongoose.model('rating',ratingSchema);


module.exports=ratingModel;