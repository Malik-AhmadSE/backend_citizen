const ProductModel = require("../models/products");
const rating=require('../models/rating');
const user=require('../models/user');
const comments=require('../models/comments');
const sales=require('../models/sales');

const TotalDoc={
    async TotalProducts(req,res,next){
        try {
            const products=await ProductModel.countDocuments();  
            if(product == []){
                return res.status(200).json({totalProducts:0});
            }
            return res.status(200).json({totalProducts:products});
        } catch (error) {
            return next(error);
        }
        
    },
    async Totaluser(req,res,next){
        try {
            const totaluser=await user.countDocuments();
            if(totaluser == []){
                return res.status(200).json({totalUser:0});
            }
            return res.status(200).json({totaluser:totaluser}); 
        } catch (error) {
           return next(error); 
        }
    },
    async Totalsales(req,res,next){
        try {
            const totalsales=await sales.countDocuments();
        if(totalsales == []){
            return res.status(200).json({totalsales:0});
        }
        return res.status(200).json({totalsales:totalsales});
        } catch (error) {
            return next(error);
        }
    },
    async Totalearn(req, res, next) {
        try {
          const totalsales = await sales.find({});      
          if (totalsales.length === 0) {
            return res.status(200).json({ totalearn: 0 });
          }
          let result=0;
          // Extracting totalprice from the model
          const totalprice = totalsales.map(sale => sale.totalprice);
          for(let i=0;i<totalprice.length;i++){
            result+=totalprice[i];
          }
      
          return res.status(200).json({ totalearn:result });
        } catch (error) {
          return next(error);
        }
      },
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