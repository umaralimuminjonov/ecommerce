const Products = require("../models/productModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr
      .replace(/\b(gte|gt|lt|lte|regex|in)\b/g, (match) => "$" + match)
      .split(",");

    this.query.find(JSON.parse(queryStr));

    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

exports.getProducts = async (req, res) => {
  try {
    const features = new APIfeatures(Products.find(), req.query)
      .filtering()
      .sorting()
      .paginating();

    const products = await features.query;

    res.json({
      status: "Success",
      result: products.length,
      products,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      product_id,
      title,
      description,
      price,
      content,
      images,
      categories,
      brand,
      colors,
      sizes,
    } = req.body;
    if (!images) return res.status(400).json({ message: "Rasm yuklamadingiz" });
    if (!categories)
      return res.status(400).json({ message: "Kategoriyani belgilamadingiz" });
    if (!colors)
      return res.status(400).json({ message: "Ranglarni belgilamadingiz" });
    if (!sizes)
      return res.status(400).json({ message: "Razmerlarni belgilamadingiz" });

    const product = await Products.findOne({ product_id });
    if (product) return res.status(400).json({ message: "Bunday tovar bor" });

    const newProduct = new Products({
      product_id,
      title: title.toLowerCase(),
      description,
      price,
      content,
      images,
      categories,
      brand,
      colors,
      sizes,
    });

    await newProduct.save();

    res.json({ data: newProduct, message: "Yangi tovar yaratildi" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { images } = req.body;
    if (!images) return res.status(400).json({ message: "Rasm yuklamadingiz" });

    const update = req.body;
    const id = req.params.id;
    await Products.findByIdAndUpdate(id, update);
    const product = await Products.findById(id);

    res.json({ data: product, message: "Tovar yangilandi" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.id);
    res.json({ message: "Xabar o'chirildi" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
