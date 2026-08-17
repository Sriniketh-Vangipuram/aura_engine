require("dotenv").config();

const connectDatabase = require("../src/config/database");
const Product = require("../src/models/Product");

const testAnalyticsPerformance = async () => {
  try {
    await connectDatabase();

    const explainResult = await Product.aggregate([
      {
        $match: {
          category: "electronics",
        },
      },

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
      },
    ]).explain("executionStats");

    console.dir(explainResult, {
      depth: null,
    });

    process.exit(0);
  } catch (error) {
    console.error(
      "Analytics performance test failed:",
      error
    );

    process.exit(1);
  }
};

testAnalyticsPerformance();