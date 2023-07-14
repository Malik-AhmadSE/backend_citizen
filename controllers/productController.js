const joi = require("joi");
const { BACKEND_SERVER_PATH } = require("../config/index");
const fs = require('fs');
const ProductModel=require('../models/products');
const productDTO=require('../DTO/products');
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const productController = {
  // for creating the product
  async createProduct(req, res, next) {
    try {
   
    const createproductschema = joi.object({
      productName: joi.string().required(),
      price: joi.number().required(),
      nature: joi.string().required(),
      discription: joi.string().required(),
      favorite:joi.bool(),
      discount: joi.number(),
      //image: joi.array().required(),
     // video: joi.string().required(),
    });
    const { error } = createproductschema.validate(req.body);
    if (error) {
      return next(error);
    }
 let url="http://localhost:8000/files/";
   
    const videoUrls = req.files.video.map((file)=>url+file.filename);
    const imageUrls = req.files.image.map((file) => url + file.filename);
    const landingimage=req.files.landingImage.map((file)=>url+file.filename);
    
   
req.body.landingImage=landingimage[0];
req.body.video=videoUrls[0];
req.body.image=imageUrls
    // return res.status(200).json({
    //   message: 'Files uploaded',
    //   body:req.body
    // });

    const { productName, price, nature,landingImage, discription, discount, image, video } =
      req.body;

     
  
   
    
    const newProduct = new ProductModel({
        productName, 
        price, 
        nature, 
        discription, 
        favorite:false,
        discount, 
        image,
        video,
        landingImage
      });

      const data= await newProduct.save();
      res.send(data)
      
          // const productDto = new productDTO(newProduct);
      
          // return res.status(201).json({ product: productDto });
    } catch (error) {
      console.log(error)
      return next(error);
    }

      




  },
  // for updating product
  async updateProduct(req, res, next) {},
  // for getting all product
  async getAll(req, res, next) {
        try {
                const allProduct = await ProductModel.find({});
          
                const productDTOarr = [];
          
                for (let i = 0; i < allProduct.length; i++) {
                  const productdto = new productDTO(allProduct[i]);
                  productDTOarr.push(productdto);
                }
          
                return res.status(200).json({ products: productDTOarr });
              } catch (error) {
                return next(error);
              }
  },
  // for getting product using id
  async getProductById(req, res, next) {
        
    const getByIdSchema = joi.object({
        id: joi.string().regex(mongodbIdPattern).required(),
      });
  
      const { error } = getByIdSchema.validate(req.params);
  
      if (error) {
        return next(error);
      }
  
      let productbyid;
  
      const { id } = req.params;
  
      try {
        productbyid = await ProductModel.findOne({ _id: id });
        if(productbyid._id ==null){
                return next(error);
        }
      } catch (error) {
        return next(error);
      }
  
      const productdto = new productDTO(productbyid);
      return res.status(200).json({ product: productdto });
  },
  // for deleting the product using id
  async deleteProductById(req, res, next) {},

};

module.exports = productController;