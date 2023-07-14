const express = require('express');

const routes=express.Router();
const authController = require('../controllers/authController');
const productController=require('../controllers/productController');
const auth = require('../middlewares/auth');
const {upload} =require("../middlewares/multerFileHndler")
/// signup ////

routes.post('/signup',authController.Signup);

//// login ////

routes.post('/login',authController.Login);

////Logout

routes.post('/logout',auth,authController.Logout);

//// refresh 

routes.get('/refresh',authController.Refresh);

////////////////////// product routes ///////////

// 1.get all product
routes.get('/product/all',productController.getAll);
// 2.create product
routes.post('/addproduct',upload.fields([
    { name: 'image', maxCount: 5 },
    { name: 'video', maxCount: 1 },
    {name:'landingImage',maxCount:1}

  ]),productController.createProduct);
// 3.update product by id 
routes.put('/updateproduct',auth,productController.updateProduct);
// 4.get product by id 
routes.get('/product/:id',productController.getProductById);
// 5.delete product by id
routes.delete('/product/:id',auth,productController.deleteProductById);

module.exports=routes;