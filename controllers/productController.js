const joi = require("joi");
const ProductModel = require("../models/products");
const productDTO = require("../DTO/products");
const rating=require('../models/rating');
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images/'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
 
module.exports.upload = multer({
  storage: storage,
  limits: { fieldSize: 5 * 1024 },
});


const productController = {
  // for creating the product
  async createProduct(req, res, next) {
    const createProductSchema = joi.object({
      productName: joi.string().required(),
      price: joi.number().required(),
      nature: joi.string().required(),
      discription: joi.string().required(),
      discount: joi.number(),
    });

    const { error } = createProductSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { productName, price, nature, discription, favorite, discount } = req.body;

    try {
      const imagePaths = await req.files.images.map((file) => file.path);
      const videoPath = await req.file.video.path;

      const newProduct = new ProductModel({
        productName,
        price,
        nature,
        discription,
        discount,
        image: imagePaths,
        video: videoPath,
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
    const updateproductschema = joi.object({
      productName: joi.string().required(),
      price: joi.number().required(),
      nature: joi.string().required(),
      discription: joi.string().required(),
      discount: joi.number(),
      image: joi.array().required(),
      video: joi.string().required(),
      productId:joi.string().regex(mongodbIdPattern).required()
    });
    const { error } = updateproductschema.validate(req.body);
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
      productId
    } = req.body;
    
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
