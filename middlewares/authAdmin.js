const User = require("../models/userModel");

const authAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    if (user.role !== "admin")
      return res.status(400).json({ message: "Sizga mumkin emas" });

    next();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = authAdmin;
