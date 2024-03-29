const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    productName:{type:String,required:true},
    price:{type:mongoose.Types.Decimal128,required:true},
    catagory:{type:String,required:true},
    discription:{type:String,required:true},
    discount:{type:Number},
    image:{type:Array,required:true},
    video:{type:String,required:true},
},
    {timestamps:true}
)


// creating model of user

const ProductModel=mongoose.model('product',productSchema);


module.exports=ProductModel;