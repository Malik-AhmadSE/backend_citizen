const joi = require("joi");
const ProductModel = require("../models/products");
const productDTO = require("../DTO/products");
const rating=require('../models/rating');
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const uploadImage=require('../services/multerimage');
const uploadVideo = require("../services/multerimage");
const productController = {
  // for creating the product
  async createProduct(req, res, next) {
    const createproductschema = joi.object({
      productName: joi.string().required(),
      price: joi.number().required(),
      nature: joi.string().required(),
      discription: joi.string().required(),
      discount: joi.number(),
      image: joi.array().required(),
      video: joi.string().required(),
    });
    const { error } = createproductschema.validate(req.body);
    if (error) {
      return next(error);
    }
    const {
      productName,
      price,
      nature,
      discription,
      discount,
      image,
      video,

    } = req.body;
    //////////// using multer ///////
    try{
    const uploadImages =await uploadImage.array('image');
    }catch(error){
      return res.status(406).json({message:'image not uploaded'});
    }
    let newProduct;
    try {
      newProduct = new ProductModel({
        productName,
        price,
        nature,
        discription,
        discount,
        image: mainImagepath,
        video: `${BACKEND_SERVER_PATH}/storage/${videoPath}`,
      });

      await newProduct.save();
    } catch (error) {
      return next(error);
    }

    const productDto = new productDTO(newProduct);

    return res.status(201).json({ product: productDto });
  },
  // for updating product
  async updateProduct(req, res, next) {
    
  },
  // for getting all product
  async getAll(req, res, next) {
    try {
      const allProduct = await ProductModel.find({});
      const favorite=await rating.countDocuments({"favorite":true});
      const productDTOarr = [];
      for (let i = 0; i < allProduct.length; i++) {
        const productshowdto = new productDTO(allProduct[i]);
        productDTOarr.push(productshowdto);
      }
      return res.status(200).json({ allproducts: [productDTOarr],totalfav:favorite});
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
      if (productbyid._id == null) {
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
    const productdto = new productDTO(productbyid);
    return res.status(200).json({ productbyid: productdto });
  },
  // for deleting the product using id
  async deleteProductById(req, res, next) {
    const deleteByIdSchema = joi.object({
      id: joi.string().regex(mongodbIdPattern).required(),
    });
    const { error } = deleteByIdSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    const { id } = req.params;
    try {
      await ProductModel.deleteOne({ _id: id });
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ productbyidDelete: "product deleted " });
  },
};

module.exports = productController;
