const express = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

const router = express.Router();

router.route("/products").get(getProducts).post(auth, authAdmin, createProduct);

router
  .route("/products/:id")
  .put(auth, authAdmin, updateProduct)
  .delete(auth, authAdmin, deleteProduct);

module.exports = router;
