const joi = require("joi");
const rating=require("../4-Models/rating");
const User=require('../4-Models/user')
const Sales=require('../4-Models/sales')
const ProductModel = require('../4-Models/products')

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const AdminController = {
  async getDashboard(req, res, next) {
try {
  const products=await ProductModel.countDocuments();  
  const user=await User.countDocuments();
  const sale=await Sales.countDocuments();
  const totalsales = await sales.find({});      
  const favorite=await rating.countDocuments({"favorite":true});

  if (totalsales.length === 0) {
    return res.status(200).json({ totalearn: 0 });
  }
  let result=0;
  // Extracting totalprice from the model
  const totalprice = totalsales.map(sale => sale.totalprice);
  for(let i=0;i<totalprice.length;i++){
    result+=totalprice[i];
  }
} catch (error) {
  
}
  }
};
const ProductModel = require("../models/products");
const rating=require('../models/rating');
const user=require('../models/user');
const comments=require('../models/comments');
const sales=require('../models/sales');

const TotalDoc={
   

   
    async TotalRating(req,res,next){
        try {
            const favorite=await rating.countDocuments({"favorite":true});
            if(favorite == []){
                return res.status(200).json({totalLikes:0});
            }
            return res.status(200).json({totalLikes:favorite});
        } catch (error) {
            return next(error);
        }
        
    },
    async TotalComments(req,res,next){
        try {
            const totalcomments=await comments.countDocuments();
            if(totalcomments == []){
                return res.status(200).json({totalcomments:0});
            }
            return res.status(200).json({totalcomments:totalcomments});
        } catch (error) {
            return next(error);
        }
        
    },
}

module.exports = AdminController;