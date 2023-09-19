const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    productName :{type:String,required:true},
    price:{type:mongoose.Types.Decimal128,required:true},
    category:{type:String},
    description:{type:String,required:true},
    favorite:{type:Boolean,default:false},
    discount:{type:Number},
    image:{type:Array},
    video:{type:String},
    landingImage:{type:String}
},
    {timestamps:true}
)


// creating model of user

const ProductModel=mongoose.model('product',productSchema);


module.exports=ProductModel;