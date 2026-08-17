const express = require("express");

const {
  getInventory,
  createProduct,
  updateProduct,
} = require("../controllers/inventory.controller");

const validate = require("../middleware/validate");

const { productSchema,} = require("../validators/product.validator");

const router = express.Router();

router.get("/", getInventory);

router.post(
  "/",
  validate(productSchema),
  createProduct
);

router.put(
  "/:id",
  validate(productSchema),
  updateProduct
);

module.exports = router;