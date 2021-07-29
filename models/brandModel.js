const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    image: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Brands", brandSchema);
