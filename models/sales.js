const mongoose=require('mongoose');
const saleSchema=mongoose.Schema({
        address: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        pinCode: {
          type: Number,
          required: true,
        },
        phoneNo: {
          type: Number,
          required: true,
        },
        quantity: {
            type: Number,
            required: true,
          },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: "product",
            required: true,
          },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
      },
    paidAt: {
        type: Date,
        default:Date.now(),
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
        default: 0,
      },

},
    {timestamps:true}
)


// creating model of user

const SaleModel=mongoose.model('sale',saleSchema);


module.exports=SaleModel;