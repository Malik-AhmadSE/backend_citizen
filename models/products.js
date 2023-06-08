const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    productName :{type:String,required:true},
    price:{type:mongoose.Types.Decimal128,required:true},
    nature:{type:String,required:true},
    discription:{type:String,required:true},
    favorite:{type:Number},
    discount:{type:Number},
    image:{type:Array,required:true},
    video:{type:String},
    eventName:{type:mongoose.SchemaTypes.ObjectId,ref:'crousal'},
},
    {timestamps:true}
)


// creating model of user

const ProductModel=mongoose.model('product',productSchema);


module.exports=ProductModel;