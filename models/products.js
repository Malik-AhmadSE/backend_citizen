const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    productName :{type:String,required:true},
    price:{type:mongoose.Types.Decimal128,required:true},
    nature:{type:String,required:true},
    content:{type:String,required:true},
    favorite:{type:Boolean,default:false},
    discount:{type:mongoose.Types.Decimal128,default:1},
    image:{type:String,required:true},
    eventname:{type:mongoose.SchemaTypes.ObjectId,ref:'crousal'},
},
    {timestamps:true}
)


// creating model of user

const ProductModel=mongoose.model('product',productSchema);


module.exports=ProductModel;