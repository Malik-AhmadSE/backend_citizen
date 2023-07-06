const joi = require("joi");
const { BACKEND_SERVER_PATH } = require("../config/index");
const fs = require('fs');
const ProductModel=require('../models/products');
const productDTO=require('../DTO/products');
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const productController = {
  // for creating the product
  async createProduct(req, res, next) {
    const createproductschema = joi.object({
      productName: joi.string().required(),
      price: joi.number().required(),
      nature: joi.string().required(),
      discription: joi.string().required(),
      favorite:joi.bool(),
      discount: joi.number(),
      image: joi.array().required(),
      video: joi.string().required(),
    });
    const { error } = createproductschema.validate(req.body);
    if (error) {
      return next(error);
    }



    const { productName, price, nature, discription,favorite, discount, image, video } =
      req.body;

     

      let bufferImage,imagePath,mainImagepath=[];
      for (let i = 0; i < image.length; i++) {
        bufferImage = Buffer.from(
          image[i].replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
          'base64'
        );
        imagePath = `${Date.now()}-${productName}-${i}.png`;
        mainImagepath.push(`${BACKEND_SERVER_PATH}/storage/${imagePath}`); 
        try {
          fs.writeFileSync(`storage/images/${imagePath}`, bufferImage); 
        } catch (error) {
          return next(error); 
        }
      }
      let bufferVideo,videoPath;
      if(video){
        bufferVideo = Buffer.from(
               video.replace(/^data:video\/(mp4);base64,/, ''),
                'base64'
        );
        videoPath = `${Date.now()}-${productName}.mp4`;

        try {
                fs.writeFileSync(`storage/videos/${videoPath}`, bufferVideo); 
              } catch (error) {
                return next(error); 
              }
      }
    let newProduct;
    try {
      newProduct = new ProductModel({
        productName, 
        price, 
        nature, 
        discription, 
        favorite,
        discount, 
        image:mainImagepath,
        video:`${BACKEND_SERVER_PATH}/storage/${videoPath}`,
      });

      await newProduct.save();
    } catch (error) {
      return next(error);
    }


    const productDto = new productDTO(newProduct);

    return res.status(201).json({ product: productDto });
      




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

  async fileUpload(req,res,next){
    console.log(req.files);
    let url="http://localhost:8000/files/";
   

    const videoFiles = req.files.filter((file) => file.mimetype.includes('video'));
    const imageFiles = req.files.filter((file) => file.mimetype.includes('image'));
    
    const videoUrls = videoFiles.map((file) => url + file.filename);
    const imageUrls = imageFiles.map((file) => url + file.filename);
    
    req.body.video = videoUrls;
    req.body.item_pic = imageUrls;
    
    return res.status(200).json({
      message: 'Files uploaded',
      videos: videoUrls,
      images: imageUrls,
    });
    
  }
};

module.exports = productController;