const express = require('express');
const routes=express.Router();
const AdminController = require('../2-Controllers/adminController');
routes.post('/dashboard',AdminController.getDashboard);
module.exports=routes;