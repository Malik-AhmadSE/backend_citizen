const express = require('express');

const routes=express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');
/// signup ////

routes.post('/signup',authController.Signup);

//// login ////

routes.post('/login',authController.Login);

////Logout

routes.post('/logout',auth,authController.Logout);

module.exports=routes;