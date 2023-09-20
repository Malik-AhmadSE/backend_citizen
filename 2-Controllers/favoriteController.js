const joi = require("joi");
const rating=require("../4-Models/rating");
const favDTO=require('../DTO/ratingdto');
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const favoriteController = {
  async createFavorite(req, res, next) {
    const createfavschema = joi.object({
            favorite:joi.boolean(),
            productId: joi.string().regex(mongodbIdPattern).required(),
            userId:joi.string().regex(mongodbIdPattern).required()
        });
     
    const { error } = createfavschema.validate(req.body);
    if (error) {
      return next(error); 
    }
    
    const {
      favorite,
      productId,
      userId,
    } = req.body;
    
    let newfav;
    try {
      const ratingexist=await rating.findOne({productId:productId,userId:userId });
      if(ratingexist){
        console.log(ratingexist);
        const favDto = await rating.findOneAndUpdate({productId,userId},{favorite,productId,userId});
        return res.status(201).json({ fav : favDto });
      }
      newfav = new rating({
       favorite,
       productId,
       userId,
      });
      await newfav.save();
    } catch (error) {
      return next(error);
    }

    const favDto = new favDTO(newfav);
    return res.status(201).json({ fav: favDto });
  },
};

module.exports = favoriteController;