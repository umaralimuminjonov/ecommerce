const express = require("express");
const cloudinary = require("cloudinary");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");
const fs = require("fs");

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

router.post("/upload", (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ message: "Fayl yuklamadingiz" });
    }

    const file = req.files.file;
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ message: "Fayl hajmi katta" });
    }

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);
      return res
        .status(400)
        .json({ message: "Fayl formati png yoki jpg bo'lsin" });
    }

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "test" },
      async (err, result) => {
        if (err) throw err;

        removeTmp(file.tempFilePath);

        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/destroy", auth, authAdmin, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id)
      return res.status(400).json({ message: "Rasm belgilanmagan" });

      cloudinary.v2.uploader.destroy(
        public_id,
        async (err, result) => {
          if (err) throw err;
          res.json({ message: "Rasm o'chirildi" });
        }
      );
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
