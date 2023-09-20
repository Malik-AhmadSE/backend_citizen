const joi = require("joi");
const rating = require("../4-Models/rating");
const User = require("../4-Models/user");
const Sales = require("../4-Models/sales");
const ProductModel = require("../4-Models/products");

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const AdminController = {
  async getDashboard(req, res, next) {
    try {
      const products = await ProductModel.countDocuments();
      const user = await User.countDocuments();
      const sale = await Sales.countDocuments();
      const totalsales = await Sales.find({});
      const favorite = await rating.countDocuments({ favorite: true });
      let result = 0;
      // Extracting totalprice from the model
      const totalprice = totalsales.map((sale) => sale.totalprice);
      for (let i = 0; i < totalprice.length; i++) {
        result += totalprice[i];
      }

      const data = {
        products: products,
        user: user,
        sale: sale,
        totalearn: result,
        favorite: favorite,
      };
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  },
  async getOrderMap(req,res,next){
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    let orderCountsLast30Days; // Define a variable to store the result
    
    // Group users by registration date and count them, but only for the last 30 days
    Sales.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }, // Filter users whose registration date is greater than or equal to 30 days ago
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateFromParts: {
              year: '$_id.year',
              month: '$_id.month',
              day: '$_id.day',
            },
          },
          count: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ])
      .then((result) => {
        orderCountsLast30Days = result; // Save the result in the variable
        console.log(orderCountsLast30Days);
        return res.status(200).json(orderCountsLast30Days)
        // Now, userCountsLast30Days contains the count of users registered in the last 30 days
      })
      .catch((err) => {
        console.error(err);
        // Handle the error
      });
  },
  async getUserMap(req,res,next){
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    let userCountsLast30Days; // Define a variable to store the result
    
    // Group users by registration date and count them, but only for the last 30 days
    User.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }, // Filter users whose registration date is greater than or equal to 30 days ago
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateFromParts: {
              year: '$_id.year',
              month: '$_id.month',
              day: '$_id.day',
            },
          },
          count: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ])
      .then((result) => {
        userCountsLast30Days = result; // Save the result in the variable
        console.log(userCountsLast30Days);
        return res.status(200).json(userCountsLast30Days)
        // Now, userCountsLast30Days contains the count of users registered in the last 30 days
      })
      .catch((err) => {
        console.error(err);
        // Handle the error
      });
  }
};

module.exports = AdminController;
