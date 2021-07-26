const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { validationResult, check } = require("express-validator");
const jwt = require("jsonwebtoken");

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

// Register
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ errors: errors.array(), message: "Email yoki parol xa'to" });

    const { name, email, password } = req.body;

    const isUser = await User.findOne({ email });
    if (isUser) return res.status(400).json({ message: "Bu hisob band" });

    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    const accesstoken = createAccessToken({ id: user._id });
    const refreshtoken = createRefreshToken({ id: user._id });

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      path: "/user/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    res
      .status(201)
      .json({ data: user, accesstoken, message: "User yaratildi" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ errors: errors.array(), message: "Email yoki parol xa'to" });

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Bunday user yo'q" });

    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Parol xa'to" });

    const accesstoken = createAccessToken({ id: user._id });
    const refreshtoken = createRefreshToken({ id: user._id });

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      path: "/user/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    res.status(200).json({ accesstoken, message: "Muaffaqiyatli kirdingiz" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
    res.json({ message: "Chiqdingiz" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Refresh Token
exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshtoken;
    if (!refreshToken)
      return res.status(400).json({ message: "Iltimos ro'yhatdan o'ting" });

    await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, user) => {
        if (err)
          return res.status(400).json({ message: "Iltimos ro'yhatdan o'ting" });

        const accessToken = createAccessToken({ id: user.id });

        res.status(200).json({ accessToken });
      }
    );
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Get user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(400).json({ message: "Foydalanuvchi mavjud emas." });

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Validation
exports.checkRegister = [
  check("email", "Email xa'to").isEmail(),
  check("password", "Parol kamida 6 ta bo'lsin").isLength({ min: 6 }),
];

exports.checkLogin = [
  check("email", "Email xa'to").normalizeEmail().isEmail(),
  check("password", "Parol kiriting").exists(),
];

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "11m" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
