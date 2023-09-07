const express = require('express');

const ProductRoutes=express.Router();

const productController=require('../2-Controllers/productController');
const auth = require('../2-Controllers/middlewares/auth');
const {upload} =require("../2-Controllers/middlewares/multerFileHndler")

// 1.get all product
ProductRoutes.get('/product/all',productController.getAll);
// 2.create product
ProductRoutes.post('/addproduct',upload.fields([
    { name: 'image', maxCount: 5 },
    { name: 'video', maxCount: 1 },
    {name:'landingImage',maxCount:1}

  ]),productController.createProduct);
// 3.update product by id 
ProductRoutes.put('/updateproduct',auth,productController.updateProduct);
// 4.get product by id 
ProductRoutes.get('/product/:id',productController.getProductById);
// 5.delete product by id
ProductRoutes.delete('/product/:id',auth,productController.deleteProductById);

module.exports=ProductRoutes;