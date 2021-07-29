const express = require("express");
const {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

const router = express.Router();

router.route("/brand").get(getBrands).post(auth, authAdmin, createBrand);

router
  .route("/brand/:id")
  .put(auth, authAdmin, updateBrand)
  .delete(auth, authAdmin, deleteBrand);

module.exports = router;
