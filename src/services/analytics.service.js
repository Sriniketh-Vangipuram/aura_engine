const Product = require("../models/Product");

const getInventoryAnalytics = async ({ category }) => {
  const pipeline = [];

  if (category) {
    pipeline.push({
      $match: {
        category: category.toLowerCase(),
      },
    });
  }

  pipeline.push(
    {
      $group: {
        _id: "$category",

        totalProducts: {
          $sum: 1,
        },

        totalStock: {
          $sum: "$stockQuantity",
        },

        totalValuation: {
          $sum: {
            $multiply: [
              "$price",
              "$stockQuantity",
            ],
          },
        },
      },
    },

    {
      $project: {
        _id: 0,
        category: "$_id",
        totalProducts: 1,
        totalStock: 1,
        totalValuation: 1,
      },
    }
  );

  return Product.aggregate(pipeline);
};

module.exports = {
  getInventoryAnalytics,
};