require("dotenv").config();

const connectDatabase = require("../src/config/database");
const Product = require("../src/models/Product");

const testPerformance = async () => {
  try {
    await connectDatabase();

    console.log("\n--- Category Query ---");

    const categoryResult = await Product.find({
      category: "electronics",
    })
      .limit(50)
      .explain("executionStats");

    console.log({
      executionTimeMillis:
        categoryResult.executionStats.executionTimeMillis,

      totalDocsExamined:
        categoryResult.executionStats.totalDocsExamined,

      totalKeysExamined:
        categoryResult.executionStats.totalKeysExamined,

      winningPlan:
        categoryResult.queryPlanner.winningPlan,
    });

    console.log("\n--- SKU Query ---");

    const skuResult = await Product.findOne({
      sku: "AURA-000001",
    }).explain("executionStats");

    console.log({
      executionTimeMillis:
        skuResult.executionStats.executionTimeMillis,

      totalDocsExamined:
        skuResult.executionStats.totalDocsExamined,

      totalKeysExamined:
        skuResult.executionStats.totalKeysExamined,

      winningPlan:
        skuResult.queryPlanner.winningPlan,
    });

    console.log("\n--- Product Name Search ---");

const searchResult = await Product.find({
  productName: {
    $regex: "mouse",
    $options: "i",
  },
})
  .limit(50)
  .explain("executionStats");

console.log({
  executionTimeMillis:
    searchResult.executionStats.executionTimeMillis,

  totalDocsExamined:
    searchResult.executionStats.totalDocsExamined,

  totalKeysExamined:
    searchResult.executionStats.totalKeysExamined,

  winningPlan:
    searchResult.queryPlanner.winningPlan,
});
    process.exit(0);
  } catch (error) {
    console.error("Performance test failed:", error);

    process.exit(1);
  }
};

testPerformance();