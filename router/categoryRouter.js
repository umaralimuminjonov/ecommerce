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

router.get("/category", getCategories);
router.post("/category", auth, authAdmin, createCategories);
router.put("/category/:id", auth, authAdmin, updateCategories);
router.delete("/category/:id", auth, authAdmin, deleteCategories);

module.exports = router;
