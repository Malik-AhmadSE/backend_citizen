const express = require('express');

const routes=express.Router();
const authController = require('../controllers/authController');
/// signup ////

routes.post('/signup',authController.Signup);

//// login ////

routes.post('/login',authController.login);
module.exports=routes;