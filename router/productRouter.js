const express = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/products").get(getProducts).post(createProduct);

router.route("/products/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
