const joi = require("joi");
const rating=require('../models/rating');
const favDTO=require('../DTO/rating');
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const favoriteController = {
  // for creating the favorite
  async createFavorite(req, res, next) {
    const createfavschema = joi.object({
            favorite:joi.boolean(),
            user:joi.string().regex(mongodbIdPattern).required(),
            product: joi.string().regex(mongodbIdPattern).required(),
        });
     
    const { error } = createfavschema.validate(req.body);
    console.log(error);
    if (error) {
      return next(error); 
    }
    
    const {
      favorite,
      user,
      product,
    } = req.body;
    
    let newfav;
    try {
      newfav = new rating({
       favorite,
       user,
       product,
      });
      await newfav.save();
    } catch (error) {
      return next(error);
    }

    const favDto = new favDTO(newfav);

    return res.status(201).json({ favorite: favDto });
  },
  // for updating product
  async updateProduct(req, res, next) {},
 
};

module.exports = favoriteController;
