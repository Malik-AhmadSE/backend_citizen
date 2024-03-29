const mongoose=require('mongoose');

const commentSchema=mongoose.Schema({
    userName :{type:mongoose.SchemaTypes.ObjectId,ref:'user'},
    commentData:{type:String},
    date:{
        type:Date,
        default:Date.now()
    }
},
    {timestamps:true}
)


// creating model of user

const CommentModel=mongoose.model('comment',commentSchema);


module.exports=CommentModel;