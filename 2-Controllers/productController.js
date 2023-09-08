const joi = require("joi");
const { BACKEND_SERVER_PATH } = require("../config/index");
const fs = require('fs');
const ProductModel=require('../4-Models/products');
const productDTO=require('../DTO/products');
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const productController = {
  // for creating the product
  async createProduct(req, res, next) {
    try {
   console.log("add product call")
   //console.log("files : ",req.files)
  // console.log("body : ",req.body)
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
    // const { error } = createproductschema.validate(req.body);
    // if (error) {
    //   return next(error);
    // }
 let url="http://localhost:8000/files/";

 req.body.landingImage=url+req.files["landingImage"][0].filename;
 req.body.video=url+req.files["video"][0].filename;
 if (req.files && req.files["image"]) {
  req.body.image = req.files["image"].map(image => url + image.filename);
} else {
  req.body.image = [];
}
console.log(req.body)
   
    const { productName, price, nature,landingImage, description, discount, image, video } =
      req.body;

    const newProduct = new ProductModel({
        productName, 
        price, 
        nature, 
        description, 
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