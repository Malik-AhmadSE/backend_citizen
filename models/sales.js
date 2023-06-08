const mongoose=require('mongoose');

const saleSchema=mongoose.Schema({
    userDetail:{type:mongoose.SchemaTypes.ObjectId,ref:'user'},
    productDetail :{type:mongoose.SchemaTypes.ObjectId,ref:'product'},
},
    {timestamps:true}
)


// creating model of user

const SaleModel=mongoose.model('sale',saleSchema);


module.exports=SaleModel;