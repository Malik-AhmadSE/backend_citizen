const mongoose=require('mongoose');

const saleSchema=mongoose.Schema({
    userName:{type:mongoose.SchemaTypes.ObjectId,ref:'user'},
    userimage:{type:mongoose.SchemaTypes.ObjectId,ref:'user'},
    productName :{type:mongoose.SchemaTypes.ObjectId,ref:'product'},
    price:{type:mongoose.SchemaTypes.ObjectId,ref:'product'},
    image:{type:mongoose.SchemaTypes.ObjectId,ref:'product'},
},
    {timestamps:true}
)


// creating model of user

const SaleModel=mongoose.model('sale',userSchema);


module.exports=SaleModel;