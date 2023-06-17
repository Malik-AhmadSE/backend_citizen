const express = require('express');

const routes=express.Router();
const authController = require('../controllers/authController');
const productController=require('../controllers/productController');
const auth = require('../middlewares/auth');
const favoriteController = require('../controllers/favoriteController');

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
// //2.GET ALL ADMIN PRODUCT
// routes.get('admin/product/all',productController.getAllproduct);
// 2.create product
routes.post('/product/add',auth,productController.createProduct);
// 3.update product by id 
routes.put('/product/update',auth,productController.updateProduct);
// 4.get product by id 
routes.get('/getproduct/:id',productController.getProductById);
// 5.delete product by id
routes.delete('/deleteProduct/:id',auth,productController.deleteProductById);
//////////// rating 

routes.post('/favorite',auth,favoriteController.createFavorite);

module.exports=routes;