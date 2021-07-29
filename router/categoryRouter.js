const express = require("express");
const {
  getCategories,
  createCategories,
  updateCategories,
  deleteCategories,
} = require("../controllers/categoryController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

const router = express.Router();

router
  .route("/category")
  .get(getCategories)
  .post(auth, authAdmin, createCategories);

router
  .route("/category/:id")
  .put(auth, authAdmin, updateCategories)
  .delete(auth, authAdmin, deleteCategories);

module.exports = router;
