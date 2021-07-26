const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.status(400).json({ message: "Invalid Authentication" });

    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(400).json({ message: "Invalid Authentication" });

      req.user = user;
      next();
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = auth;
