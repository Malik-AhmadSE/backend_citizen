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

      
      const UserChart= await getUserMap()
      const OrderChart= await getOrderMap()
      console.log("UserChart ",UserChart);
      const data = {
        products: products,
        user: user,
        sale: sale,
        totalearn: result,
        favorite: favorite,
        UserChart,
        OrderChart
      }

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  },
 
 
};


const getUserMap = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Use a promise to handle the asynchronous aggregation
  return new Promise((resolve, reject) => {
    User.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
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
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getOrderMap = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Use a promise to handle the asynchronous aggregation
  return new Promise((resolve, reject) => {
    Sales.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
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
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Now, you can use these functions with async/await as before.




module.exports = AdminController;
