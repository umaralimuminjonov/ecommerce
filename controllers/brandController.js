const Brand = require("../models/brandModel");

exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.json(brands);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.createBrand = async (req, res) => {
  try {
    const { name, image } = req.body;
    const brand = await Brand.findOne({ name });
    if (brand) return res.status(400).json({ message: "Bunday brend mavjud" });

    if (!image) return res.status(400).json({ message: "Rasm yuklamadingiz" });

    const newBrand = new Brand({ name, image });

    await newBrand.save();
    res.json({ data: newBrand, message: "Yangi brend yaratildi" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const update = req.body;
    const id = req.params.id;
    await Brand.findByIdAndUpdate(id, update);
    const brand = await Brand.findById(id);

    res.json({ data: brand, message: "Brend yangilandi" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);

    res.json({ message: "Brend o'chirildi" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
