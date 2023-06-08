const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    productName :{type:String,required:true},
    price:{type:mongoose.Types.Decimal128,required:true},
    nature:{type:String,required:true},
    discription:{type:String,required:true},
    favorite:{type:Number,default:null},
    discount:{type:Number,default:null},
    image:{type:Array,required:true},
    eventName:{type:mongoose.SchemaTypes.ObjectId,ref:'crousal'},
},
    {timestamps:true}
)


// creating model of user

const ProductModel=mongoose.model('product',productSchema);


module.exports=ProductModel;