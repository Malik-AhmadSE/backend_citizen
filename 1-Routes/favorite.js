const express = require('express');

const routes=express.Router();
const favoriteController = require('../2-Controllers/favoriteController');
routes.post('/add',favoriteController.createFavorite);
module.exports=routes;