const mongoose=require('mongoose');

const commentSchema=mongoose.Schema({
    userName :{type:mongoose.SchemaTypes.ObjectId,ref:'user'},
    content:{type:String},
},
    {timestamps:true}
)


// creating model of user

const CommentModel=mongoose.model('comment',commentSchema);


module.exports=CommentModel;