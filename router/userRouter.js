const express = require("express");
const {
  register,
  checkRegister,
  refreshToken,
  login,
  checkLogin,
  logout,
  getUser,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/register", checkRegister, register);

router.post("/login", checkLogin, login);

router.get("/logout", logout);

router.get("/refresh_token", refreshToken);

router.get("/info", auth, getUser);

module.exports = router;
