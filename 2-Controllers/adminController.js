const joi = require("joi");
const rating = require("../4-Models/rating");
const User = require("../4-Models/user");
const Sales = require("../4-Models/sales");
const comment=require("../4-Models/comments");
const ProductModel = require("../4-Models/products");
const offers=require("../4-Models/crousal");
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const AdminController = {
  async getDashboard(req, res, next) {
    try {
      const products = await ProductModel.countDocuments();
      const user = await User.countDocuments();
      const sale = await Sales.countDocuments();
      const Comment = await comment.countDocuments();
      const Offers = await offers.countDocuments();
      const totalsales = await Sales.find({});
      const favorite = await rating.countDocuments({ favorite: true });
      let result = 0;

      // Extracting totalprice from the model
      const totalprice = totalsales.map((sale) => sale.totalprice);
      for (let i = 0; i < totalprice.length; i++) {
        result += totalprice[i];
      }

      const UserChart = await getUserMap();
      const OrderChart = await getOrderMap();
      console.log(Offers)
      const data = {
        products: products,
        user: user,
        sale: sale,
        totalearn: result,
        favorite: favorite,
        comments:Comment,
        offer:Offers,
        UserChart,
        OrderChart,
      };

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

const getUserMap = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    const result = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateFromParts: {
              year: "$_id.year",
              month: "$_id.month",
              day: "$_id.day",
            },
          },
          count: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getOrderMap = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    const result = await Sales.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateFromParts: {
              year: "$_id.year",
              month: "$_id.month",
              day: "$_id.day",
            },
          },
          count: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = AdminController;
